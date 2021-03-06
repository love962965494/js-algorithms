## 双向链表
在计算机科学中，一个双向链表(doubly linked list)是由一组称为节点的顺序链接记录组成的链表数据结构，每个节点包含两个字段，称为链接，它们是对节点序列中上一个节点和下一个节点的引用。开始节点和结束节点的上一个链接和下一个链接为别指向某种终止节点，通常是前哨节点或null，以方便遍历列表。如果只有一个前哨节点，则列表通过前哨节点循环链接。它可以被概念化为两个由相同数据项组成的单链表，但顺序相反。

<img src="https://camo.githubusercontent.com/a77efae509d76b6329bf3752d5367aaa4d8905f0/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f352f35652f446f75626c792d6c696e6b65642d6c6973742e737667" style="background: #fff" alt="双向链表示意图" />

两个节点链接允许在任一方向上遍历列表。

在双向链表中进行添加或者删除节点时，需做的链接更改要比单向链表复杂的多。这种操作在单向链表中更简单高效，因为不需要关注一个节点（除第一个和最后一个节点以外的节点）的两个链接，而只需要关注一个链接即可。

## 复杂度
### 时间复杂度
| Access | Search | Insertion | Deletion |
| ------ | ------ | --------- | -------- |
| O(n)   | O(n)   | O(1)      | O(1)     |

### 空间复杂度
O(n)

## 参考
* <a href="https://en.wikipedia.org/wiki/Doubly_linked_list">Wikipedia</a>
* <a href="https://www.youtube.com/watch?v=JdQeNxWCguQ&t=7s&index=72&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8">YouTube</a>