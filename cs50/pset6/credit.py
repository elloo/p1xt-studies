import cs50
import math

# Requesting card number
print("Number: ", end="")
n = cs50.get_int()

# Counting length of card number
nLength = int(math.log10(n)) + 1

# Declaring list to store separate card no. digits
digits = []

# Assigning each card number to an indice in the digits list
for i in range(nLength):

    digits.append(int(n % 10))
    n = n / 10

# Multiplying every odd number by two, starting from second-last
otherDigits = []
otherDigitsAdded = 0

for i in range(nLength):

    if i % 2 == 1:
        otherDigits.append(digits[i] * 2)
    else:
        otherDigits.append(0)

    # Adding individual digits of all integers
    if otherDigits[i] > 0:
        otherDigitsAdded += int(otherDigits[i] % 10)
        otherDigitsAdded += int(otherDigits[i] / 10)

# Adding remaining digits
remainingAdded = 0

for i in range(nLength):

    if i % 2 == 0:
        remainingAdded += digits[i]

# Checking last digit of otherDigitsAdded + remainingAdded
checkInt = otherDigitsAdded + remainingAdded

if checkInt % 10 == 0:

    if digits[nLength - 1] == 3:
        print("AMEX")

    elif digits[nLength - 1] == 5:
        print("MASTERCARD")

    else:
        print("VISA")

else:
    print("INVALID")