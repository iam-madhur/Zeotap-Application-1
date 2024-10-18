class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type; // 'operator' or 'operand'
    this.left = left; // Reference to left child
    this.right = right; // Reference to right child
    this.value = value; // Optional value for operand nodes
  }
}

module.exports = Node;
