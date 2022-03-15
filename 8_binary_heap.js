// WHAT IS A BINARY HEAP?
// Very similar to a binary search tree, but with some different rules!
// In a MaxBinaryHeap, parent nodes are always larger than child nodes.
// In a MinBinaryHeap, parent nodes are always smaller than child

// MAX BINARY HEAP
// Each parent has at most two child nodes
// The value of each parent node is always greater than its child nodes
// In a max Binary Heap the parent is greater than the children, but there are no guarantees between sibling nodes.
// A binary heap is as compact as possible. All the children of each node are as full as they can be and left children are filled out first+

// Why do we need to know this?
// Binary Heaps are used to implement Priority Queues, which are very commonly used data structures
// They are also used quite a bit, with graph traversal algorithms

// STORING A BINARY HEAP...
// A LIST/ARRAY REPRESENTING A HEAP
// 0      1     2      3     4      5     6      7     8      9    10    11   12   13   14

// For any child node at index  n...
// Its parent is at index (n-1)/2
// The left child is stored at 2n + 1
// The right child is at 2n + 2

// insert - O(log n)
// Remov0e - O(log n)
// Search - O(n)

class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(newItemVal) {
    this.values.push(newItemVal);
    this.bubbleUp();
  }
  bubbleUp() {
    let newItemIdx = this.values.length - 1; // newItemIdx
    const newItemVal = this.values[newItemIdx]; // newItemVal
    while (newItemIdx > 0) {
      let parentIdx = Math.floor((newItemIdx - 1) / 2); // parents index of newItemIdx
      let parentVal = this.values[parentIdx]; // parent value
      if (newItemVal <= parentVal) break;

      // but if value of new newItemVal is larger; Swap the values with two steps
      this.values[parentIdx] = newItemVal;
      this.values[newItemIdx] = parentVal;
      newItemIdx = parentIdx; // Set newItemIdx to be the parentIndex, and start over!
    }
  }
}

let heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
