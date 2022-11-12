import numpy as np
from sklearn.neighbors import NearestNeighbors
from scipy.sparse import csr_matrix
  
import warnings

warnings.simplefilter(action='ignore', category=FutureWarning)
    
def create_matrix(df):
    N = len(df['user_id'].unique())
    M = len(df['shopitem_id'].unique())
      
    # Map Ids to indices
    user_mapper = dict(zip(np.unique(df['user_id']), list(range(N))))
    shopItem_mapper = dict(zip(np.unique(df["shopitem_id"]), list(range(M))))
      
    # Map indices to IDs
    shopItem_inv_mapper = dict(zip(list(range(M)), np.unique(df["shopitem_id"])))
      
    user_index = [user_mapper[i] for i in df['user_id']]
    movie_index = [shopItem_mapper[i] for i in df['shopitem_id']]
  
    X = csr_matrix((df["rating"], (movie_index, user_index)), shape=(M, N))
      
    return X, shopItem_mapper, shopItem_inv_mapper
  
def find_similar_shopItems(shopitem_id, recommend_count, rating_csv):    
    metric= 'cosine'
    
    show_distance = False

    X, shopItem_mapper, shopItem_inv_mapper = create_matrix(rating_csv)

    result = []
      
    cloth_ind = shopItem_mapper[shopitem_id]
    cloth_vec = X[cloth_ind]
    
    recommend_count += 1

    kNN = NearestNeighbors(n_neighbors=recommend_count, algorithm="brute", metric=metric)
    kNN.fit(X)
    
    cloth_vec = cloth_vec.reshape(1, -1)

    neighbour = kNN.kneighbors(cloth_vec, return_distance=show_distance)
    
    for i in range(0, recommend_count):
        n = neighbour.item(i)
        result.append(shopItem_inv_mapper[n])

    result.pop(0)
    return result