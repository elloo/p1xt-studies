from nltk.tokenize import sent_tokenize


def lines(a, b):
    """Return lines in both a and b"""

    # Converting .txt strings into lists
    a = a.replace("\\n", "")
    aList = a.splitlines()

    b = b.replace("\\n", "")
    bList = b.splitlines()

    # Building list of identical lines
    same = set(aList) & set(bList)
    same = list(same)

    return same


def sentences(a, b):
    """Return sentences in both a and b"""

    # Converting .txt sentences into lists
    a = a.replace("\\n", "")
    aList = sent_tokenize(a)
    b = b.replace("\\n", "")
    bList = sent_tokenize(b)

    # Building list of identical sentences
    same = set(aList) & set(bList)
    same = list(same)

    return same


def substrings(a, b, n):
    """Return substrings of length n in both a and b"""

    # Checking valid substring length (n)
    if n > len(a) or n > len(b):
        return []

    # Creating lists
    a = a.replace("\\n", "")
    aList = []
    b = b.replace("\\n", "")
    bList = []

    # Finding all substrings of n length
    for i in range(len(a)):
        if len(a[i:i + n]) == n:
            aList.append(a[i:i + n])

    for i in range(len(b)):
        if len(a[i:i + n]) == n:
            bList.append(b[i:i + n])

    # Building list of identical sentences
    same = set(aList) & set(bList)
    same = list(same)

    return same
