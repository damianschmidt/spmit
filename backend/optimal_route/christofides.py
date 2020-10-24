from random import shuffle


class UnionFind:
    def __init__(self):
        self.weights = {}
        self.parents = {}

    def __getitem__(self, ob):
        if ob not in self.parents:
            self.parents[ob] = ob
            self.weights[ob] = 1
            return ob

        # find path of objects leading to the root
        path = [ob]
        root = self.parents[ob]
        while root != path[-1]:
            path.append(root)
            root = self.parents[root]

        # compress the path and return
        for ancestor in path:
            self.parents[ancestor] = root
        return root

    def __iter__(self):
        return iter(self.parents)

    def union(self, *objects):
        roots = [self[ob] for ob in objects]
        heaviest = max([(self.weights[r], r) for r in roots])[1]
        for r in roots:
            if r != heaviest:
                self.weights[heaviest] += self.weights[r]
                self.parents[r] = heaviest


def christofides_algorithm(lockers_list, pair_route_time):
    graph = build_graph(lockers_list, pair_route_time)
    mst = minimum_spanning_tree(graph)
    odd_vertexes = find_odd_vertexes(mst)
    minimum_weight_matching(mst, graph, odd_vertexes)
    eulerian_tour = find_eulerian_tour(mst, graph)
    path, length = take_shortcuts(eulerian_tour, graph)
    reordered_path = start_from_courier(path)
    return reordered_path, length


def build_graph(lockers_list, pair_route_time):
    graph = {}
    for locker in lockers_list:
        for another_locker in lockers_list:
            if locker != another_locker:
                if locker not in graph:
                    graph[locker] = {}

                graph[locker][another_locker] = get_cost(
                    locker, another_locker, pair_route_time)
    return graph


def get_cost(a, b, cost_dict):
    try:
        return cost_dict[f'{a}_{b}']
    except KeyError:
        return cost_dict[f'{b}_{a}']


def minimum_spanning_tree(graph):
    tree = []
    subtrees = UnionFind()
    for W, u, v in sorted((graph[u][v], u, v) for u in graph for v in graph[u]):
        if subtrees[u] != subtrees[v]:
            tree.append((u, v, W))
            subtrees.union(u, v)
    return tree


def find_odd_vertexes(mst):
    temp_graph = {}
    vertexes = []
    for edge in mst:
        if edge[0] not in temp_graph:
            temp_graph[edge[0]] = 0

        if edge[1] not in temp_graph:
            temp_graph[edge[1]] = 0

        temp_graph[edge[0]] += 1
        temp_graph[edge[1]] += 1

    for vertex in temp_graph:
        if temp_graph[vertex] % 2 == 1:
            vertexes.append(vertex)
    return vertexes


def minimum_weight_matching(mst, graph, odd_vertexes):
    shuffle(odd_vertexes)

    while odd_vertexes:
        v = odd_vertexes.pop()
        length = float("inf")
        closest = 0

        for u in odd_vertexes:
            if v != u and graph[v][u] < length:
                length = graph[v][u]
                closest = u

        mst.append((v, closest, length))
        odd_vertexes.remove(closest)


def find_eulerian_tour(mst, graph):
    neighbors = {}
    for edge in mst:
        if edge[0] not in neighbors:
            neighbors[edge[0]] = []

        if edge[1] not in neighbors:
            neighbors[edge[1]] = []

        neighbors[edge[0]].append(edge[1])
        neighbors[edge[1]].append(edge[0])

    start_vertex = mst[0][0]
    eulerian_path = [neighbors[start_vertex][0]]

    while len(mst) > 0:
        for index, v, in enumerate(eulerian_path):
            if len(neighbors[v]) > 0:
                break

        while len(neighbors[v]) > 0:
            w = neighbors[v][0]
            remove_edge(mst, v, w)

            del neighbors[v][(neighbors[v].index(w))]
            del neighbors[w][(neighbors[w].index(v))]

            index += 1
            eulerian_path.insert(index, w)
            v = w
    return eulerian_path


def remove_edge(mst, vertex1, vertex2):
    for index, item in enumerate(mst):
        if (item[0] == vertex2 and item[1] == vertex1) or (item[0] == vertex1 and item[1] == vertex2):
            del mst[index]


def take_shortcuts(eulerian_tour, graph):
    current = eulerian_tour[0]
    path = [current]
    visited = []
    length = 0

    for v in eulerian_tour[1:]:
        if v not in visited:
            path.append(v)
            visited.append(v)

            length += graph[current][v]
            current = v

    return path, length


def start_from_courier(path):
    index = path.index('courier')
    return path[index:] + path[1:index + 1]
