import cs50


def main():
    print("Height: ", end="")
    h = cs50.get_int()

    # Ensuring input meets requirements
    if 1 <= h and h <= 23:

        # For new lines of the pyramids
        for pyH in range(1, h + 1):

            # Aligning hashmarks on each line
            for pySpaces in range(h, pyH, -1):
                print(" ", end="")

            # Printing left pramid
            print("#" * pyH, end="")

            # Space between pyramids
            print("  ", end="")

            # Printing right pramid
            print("#" * pyH, end="")

            # Start next line
            print("")

    elif h == 0:
        exit()

    else:
        main()


if __name__ == "__main__":
    main()