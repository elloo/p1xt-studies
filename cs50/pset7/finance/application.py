from cs50 import eprint
from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Ensure responses aren't cached


@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.route("/", methods=["GET", "POST"])
@login_required
def index():
    """Show portfolio of stocks"""

    if request.method == "POST":

        # Determining current cash amount
        cash = db.execute("SELECT cash FROM users WHERE id=:id", id=session["user_id"])
        cash = cash[0]['cash']

        # Processing provided figure for additonal funding
        funding = request.form.get("funding", type=int)
        if not funding:
            return apology("whole integers only")
        if funding < 0:
            return apology("positive integers only")

        # Updating database
        db.execute("UPDATE users SET cash=:cash WHERE id=:id",
                   id=session["user_id"], cash=cash + funding)

        return redirect("/")

    else:

        # Retrieving cash value
        cash = db.execute("SELECT cash FROM users WHERE id=:id", id=session["user_id"])
        cash = cash[0]['cash']
        cash = usd(cash)

        # Calculating grand total
        grand = db.execute(
            "SELECT SUM(total) AS grand FROM portfolio WHERE id=:id", id=session["user_id"])
        grand = grand[0]['grand']
        if grand is None:
            grand = usd(0)
        else:
            grand = usd(grand)

        # Initialising list of stocks
        stocks = []
        user = db.execute("SELECT * FROM portfolio WHERE id=:id", id=session["user_id"])

        # Defining attributes of each stock for HTML table
        for stock in user:
            check = lookup(stock['stock'])

            symbol = stock['stock']
            amount = stock['amount']
            price = usd(check['price'])
            total = usd(stock['amount'] * check['price'])

            # Appending stock definition to stocks list
            stock = dict(symbol=symbol, amount=amount, price=price, total=total)
            stocks.append(stock)

        # Rendering homepage
        return render_template("index.html", cash=cash, stocks=stocks, grand=grand)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""

    if request.method == "POST":

        # Storing session user_id
        userID = session["user_id"]

        # Checking stock exists
        symbol = request.form.get("symbol")
        stock = lookup(symbol)

        if not stock:
            return apology("stock not found")

        # If requested amount is not a positive integer
        shares = request.form.get("shares", type=int)
        if not shares:
            return apology("requested amount is not an integer")
        elif shares < 0:
            return apology("requested amount is not a positive integer")

        # Defining purchase details
        user = db.execute("SELECT * FROM users WHERE id=:id", id=userID)
        id = user[0]['id']
        username = user[0]['username']
        cash = user[0]['cash']
        unitPrice = stock['price']
        total = unitPrice * shares

        # Check if user can afford stock. Allow purchase if able.
        if cash < total:
            return apology("insufficient funds")
        else:
            # If owned, update entry in portfolio db
            owned = db.execute(
                "SELECT * FROM portfolio WHERE id=:id AND stock=:stock", id=userID, stock=symbol)
            if owned:
                amount = owned[0]['amount']
                oldTotal = owned[0]['total']
                db.execute("UPDATE portfolio SET price=:price, amount=:amount, total=:total WHERE id=:id AND stock=:stock",
                           id=userID, stock=symbol, price=unitPrice, amount=amount + shares, total=oldTotal + total)
                db.execute("INSERT INTO history (id, user, stock, price, amount, fund) VALUES (:id, :user, :stock, :price, :amount, :fund)",
                           id=userID, user=username, stock=symbol, price=unitPrice, amount=shares, fund=total * -1)
            # Otherwise, insert a new entry
            else:
                db.execute("INSERT INTO portfolio (id, user, stock, price, amount, total) VALUES (:id, :user, :stock, :price, :amount, :total)",
                           id=userID, user=username, stock=symbol, price=unitPrice, amount=shares, total=total)
                db.execute("INSERT INTO history (id, user, stock, price, amount, fund) VALUES (:id, :user, :stock, :price, :amount, :fund)",
                           id=userID, user=username, stock=symbol, price=unitPrice, amount=shares, fund=total * -1)

            cashUpdate = cash - total
            db.execute("UPDATE users SET cash=:cashUpdate WHERE id=:id",
                       cashUpdate=cashUpdate, id=userID)

        # Redirect user to homepage
        return redirect("/")

    else:
        return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""

    # Initialising list of stocks
    transactions = []
    history = db.execute(
        "SELECT * FROM history WHERE id = :id ORDER BY time DESC LIMIT 0, 30", id=session["user_id"])

    # Defining attributes of each stock for HTML table
    for transaction in history:
        check = lookup(transaction['stock'])
        time = transaction['time']
        symbol = transaction['stock']
        amount = transaction['amount']
        price = usd(check['price'])
        total = usd(transaction['amount'] * check['price'])

        # Appending stock definition to stocks list
        transaction = dict(time=time, symbol=symbol, amount=amount, price=price, total=total)
        transactions.append(transaction)

    # Rendering homepage
    return render_template("history.html", transactions=transactions)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                          username=request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""

    if request.method == "POST":

        # Looking up stock symbol
        symbol = request.form.get("symbol")
        quote = lookup(symbol)

        # Apology in case of non-existent symbol
        if not quote:
            return apology("stock not found")
        # Rendering results
        else:
            return render_template("quoted.html", name=quote['name'], price=usd(quote['price']))

    else:
        return render_template("quote.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        password = request.form.get("password")
        username = request.form.get("username")
        confirmation = request.form.get("confirmation")

        # Ensure username was submitted
        if not username:
            return apology("must provide username")

        # Ensure password was submitted
        elif not password:
            return apology("must provide password")

        # Ensure confirmation was submitted
        elif not confirmation:
            return apology("must provide confirmation")

        # Ensure password and confirmation match
        elif password != confirmation:
            return apology("password does not match confirmation")

        # Encrypting password
        hashPass = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)

        result = db.execute("INSERT INTO users (username, hash) VALUES(:username, :hashPass)",
                            username=request.form.get("username"), hashPass=hashPass)
        if not result:
            return apology("account already exists")

        lastID = db.execute("SELECT * FROM users WHERE username=:user", user=username)
        lastID = lastID[0]['id']

        # Allowing automatic log-in
        session["user_id"] = lastID

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""

    if request.method == "POST":

        userID = session["user_id"]

        # Checking stock exists
        symbol = request.form.get("symbol")
        stock = lookup(symbol)

        if not symbol or stock is None:
            return apology("stock does not exist")

        # Checking held stock
        oldStock = db.execute("SELECT * FROM portfolio WHERE stock = :stock", stock=symbol)
        oldAmount = oldStock[0]['amount']
        if oldAmount is None:
            return apology("stock not in portfolio")

        # If requested amount is not a positive integer
        shares = request.form.get("shares", type=int)
        if shares < 0:
            return apology("requested amount is not a positive integer")

        # Defining user details
        user = db.execute("SELECT * FROM users WHERE id = :id", id=userID)
        username = user[0]['username']

        # If attempting to sell more stock than currently holding:
        if oldAmount < shares:
            return apology("sell amount exceeds holdings")

        # Add profit
        onHand = db.execute("SELECT cash FROM users WHERE id = :id", id=userID)
        onHand = onHand[0]['cash']
        unitPrice = stock['price']
        profit = unitPrice * shares
        db.execute("UPDATE users SET cash = :profit WHERE id = :id",
                   profit=profit + onHand, id=userID)

        # Removing old stock from portfolio
        oldTotal = oldStock[0]['total']
        db.execute("UPDATE portfolio SET price=:price, amount=:amount, total=:total WHERE id=:id AND stock=:stock",
                   id=userID, stock=symbol, price=unitPrice, amount=oldAmount - shares, total=oldTotal - profit)

        # Adding entry to history table
        db.execute("INSERT INTO history (id, user, stock, price, amount, fund) VALUES (:id, :user, :stock, :price, :amount, :fund)",
                   id=userID, user=username, stock=symbol, price=unitPrice, amount=shares * -1, fund=profit)

        # Redirect user to homepage
        return redirect("/")

    else:

        # Retrieving held stock for menu selection
        userID = session["user_id"]
        user = db.execute("SELECT * FROM portfolio WHERE id = :id AND amount > 0", id=userID)
        stocks = []

        # Retrieving each stock listed in portfolio
        for stock in user:
            symbol = stock['stock']

            # Appending stock names to stocks list
            stock = dict(symbol=symbol)
            stocks.append(stock)

        return render_template("sell.html", stocks=stocks)


def errorhandler(e):
    """Handle error"""
    return apology(e.name, e.code)


# listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)