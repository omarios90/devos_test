from main import get_divisors


def get_divisors_assertion(num, expected_divisors):
    result = get_divisors(num)
    assert(expected_divisors == result), "not equal %s & %s" % (
        expected_divisors, result)


def test_get_divisors():
    get_divisors_assertion(15, set([1, 3, 5]))
    get_divisors_assertion(32, set([1, 2, 4, 8, 16]))
    get_divisors_assertion(36, set([1, 2, 3, 4, 6, 9, 12, 18]))
    get_divisors_assertion(77, set([1, 7, 11]))
    print("success")


test_get_divisors()
