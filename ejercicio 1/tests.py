from main import get_divisors, get_number_type, NumType


def get_divisors_assertion(num, expected_divisors):
    result = get_divisors(num)
    assert(expected_divisors == result), "expected divisors are %s but we got %s" % (
        expected_divisors, result)


def get_num_type_assertion(num, expected_num_type):
    result = get_number_type(num)
    assert(expected_num_type == result), "expected num type is %s but we got %s" % (
        expected_num_type, result)


def test_get_divisors():
    get_divisors_assertion(6, set([1, 2, 3]))
    get_divisors_assertion(15, set([1, 3, 5]))
    get_divisors_assertion(32, set([1, 2, 4, 8, 16]))
    get_divisors_assertion(36, set([1, 2, 3, 4, 6, 9, 12, 18]))
    get_divisors_assertion(77, set([1, 7, 11]))
    print("success in get_divisors tests")


def test_get_num_type():
    get_num_type_assertion(6, NumType.PERFECT)
    get_num_type_assertion(15, NumType.DEFICIENT)
    get_num_type_assertion(32, NumType.DEFICIENT)
    get_num_type_assertion(36, NumType.ABUNDANT)
    get_num_type_assertion(77, NumType.DEFICIENT)
    print("success in get_num_type tests")


test_get_divisors()
test_get_num_type()
