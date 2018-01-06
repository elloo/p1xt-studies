import cs50
import crypt
import sys

# Requesting hashed password
if len(sys.argv) != 2:
    print("ERROR: You need ONE hashed password.")
    exit(1)

initHash = sys.argv[1]

alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

loopTotal = 0

# Control values for list indices
a = 0
b = 0
c = 0

# Control for alphabet cycles
i = 0

while i <= 53:

    # Resetting i at the end of each alphabet cycle
    if i == 52:
        i = 0

    # Initialising genKey list
    # REMEMBER: Every index needs to be appended at each iteration
    genKey = []

    # Generating two-char genKeys
    if loopTotal >= 52 and loopTotal <= 2755:
        if i == 0:
            a += 1

        if loopTotal == 52:
            a = 0

        genKey.insert(0, alpha[a])

    # Generating three-char genKeys
    if loopTotal >= 2756 and loopTotal <= 143363:
        if i == 0:
            a += 1

        if loopTotal == 2756 or a > 51:
            a = 0

        # 52 x 52 == 2704 combinations of two-char genKeys
        # Each b value cycles through every two-char combination
        if (loopTotal - 2756) % 2704 == 0:
            b += 1

        if a != 52 and b != 52:
            genKey.insert(0, alpha[b])
            genKey.insert(1, alpha[a])

    # Generating four-char genKeys
    if loopTotal >= 143364 and loopTotal <= 7454979:
        if i == 0:
            a += 1

        if loopTotal == 143364 or a == 52:
            a = 0

        if loopTotal == 143364 or b == 52:
            b = 0

        if loopTotal == 143364 or c == 52:
            c = 0

        # 52 x 52 x 52 == 140608 different three-char genKeys
        if (loopTotal - 143364) % 140608 == 0:
            c += 1

        if (loopTotal - 143364) % 2704 == 0:
            b += 1

        if a != 52 and b != 52 and c != 52:
            genKey.insert(0, alpha[c])
            genKey.insert(1, alpha[b])
            genKey.insert(2, alpha[a])

    # For one-char genKeys and last characters of genKeys
    genKey.append(alpha[i])

    # Converting list to string
    genKeyStr = ''.join(genKey)

    # Comparing initial and generated hash
    genHash = crypt.crypt(genKeyStr, "50")

    if initHash == genHash:
        print(genKeyStr)
        exit(0)

    # Updating total number of loops and i
    loopTotal += 1
    i += 1

exit(1)