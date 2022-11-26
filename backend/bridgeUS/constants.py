from enum import Enum

class OrderStatus(Enum):
    PRE_ORDER = 0
    PRE_SHIPPING = 1
    SHIPPING = 2
    POST_SHIPPING = 3
    
    def __int__(self):
        return self.value

SEARCH_RESULT_COUNT = 8    