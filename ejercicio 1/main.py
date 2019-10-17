def get_divisors(num):
    result = set()
    result.add(1)
    for i in range(2, int(num ** 0.5) + 1):
        div = num / i
        if div % 1 == 0:
            result.add(i)
            result.add(int(div))
    return result
