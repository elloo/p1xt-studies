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
db = SQL("sqlite:///commonplace.db")


@app.route("/", methods=["GET", "POST"])
@login_required
def index():
    """Showing quotes"""

    # If sort menu is used
    if request.method == 'POST':

        # Retrieving submitted category
        catSort = request.form.get('category')
        if catSort == 'All':
            user = db.execute("SELECT * FROM quotes WHERE id=:id", id=session["user_id"])
        else:
            user = db.execute("SELECT * FROM quotes WHERE id=:id AND category=:category", id=session["user_id"], category=catSort)

    else:
        user = db.execute("SELECT * FROM quotes WHERE id=:id", id=session["user_id"])

    # Initialising list of quotes
    quotes = []

    # Defining attributes of each quote for HTML table
    for quote in user:
        url = quote['url']
        category = quote['category']
        source = quote['source']
        quote = quote['quote']


        # Appending quote definition to quotes list
        quote = dict(category=category, quote=quote, source=source, url=url)
        quotes.append(quote)

    # Selecting unique categories
    categories = []
    cats = db.execute("SELECT DISTINCT category FROM quotes WHERE id=:id", id=session["user_id"])

    for category in cats:
        category = category['category']

        category = dict(category=category)
        categories.append(category)

    # Rendering homepage
    return render_template("index.html", quotes=quotes, categories=categories)



@app.route("/add", methods=["GET", "POST"])
@login_required
def add():
    """Add quotes and their sources"""

    if request.method == "POST":

        # Storing session user_id
        id = session["user_id"]

        # Assigning variables to form content
        category = request.form.get("category")
        if category == '':
            category = 'None'
        quote = request.form.get("quote")
        source = request.form.get("source")
        url = request.form.get("url")
        if url == '':
            url = 'https://www.google.com.au/search?q=' + source

        # Finding username
        user = db.execute("SELECT * FROM users WHERE id=:id", id=id)
        username = user[0]['username']

        # Inserting quote into database
        add = db.execute("INSERT INTO quotes (category, id, username, quote, source, url) VALUES (:category, :id, :user, :quote, :source, :url)",
                    category=category, id=id, user=username, quote=quote, source=source, url=url)

        if not add:
            return apology("unsuccessful", 403)

        # Redirect user to homepage
        return redirect("/")

    else:
        return render_template("add.html")


@app.route("/edit", methods=["GET", "POST"])
def edit():
    """Allow user to edit quote entries"""

    user_id = session["user_id"]

    # If sort menu is used
    if request.method == 'POST':

        # Retrieving submitted category
        catSort = request.form.get('category')
        if catSort == 'All':
            user = db.execute("SELECT * FROM quotes WHERE id=:id", id=user_id)
        else:
            user = db.execute("SELECT * FROM quotes WHERE id=:id AND category=:category", id=user_id, category=catSort)

        if request.form.get('quote'):
            selectedQuote = request.form.get('quote')

            # Allow user to edit categories
            if request.form.get('newCat'):
                newCat = request.form.get('newCat')
                if newCat == '':
                    newCat = 'None';
                db.execute("UPDATE quotes SET category=:category WHERE quote=:quote",
                            category=newCat, quote=selectedQuote)

            # Allow user to edit source URL
            if request.form.get('newURL'):
                newURL = request.form.get('newURL')
                newURL = 'https://' + newURL
                db.execute("UPDATE quotes SET url=:url WHERE quote=:quote",
                            url=newURL, quote=selectedQuote)

            # Allow users to delete quotes
            if request.form.get('delete'):
                db.execute("DELETE FROM quotes WHERE quote=:quote",
                            quote=selectedQuote)

            return redirect("/")

    else:
        user = db.execute("SELECT * FROM quotes WHERE id=:id", id=user_id)

    # Initialising list of quotes
    quotes = []

    # Defining attributes of each quote for HTML table
    for quote in user:
        category = quote['category']
        url = quote['url']
        source = quote['source']
        quote = quote['quote']

        # Appending quote definition to quotes list
        quote = dict(category=category, quote=quote, source=source, url=url)
        quotes.append(quote)

    # Selecting unique categories
    categories = []
    cats = db.execute("SELECT DISTINCT category FROM quotes WHERE id=:id", id=user_id)

    for category in cats:
        category = category['category']

        category = dict(category=category)
        categories.append(category)

    # Rendering homepage
    return render_template("edit.html", quotes=quotes, categories=categories)



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


def errorhandler(e):
    """Handle error"""
    return apology(e.name, e.code)


# listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)