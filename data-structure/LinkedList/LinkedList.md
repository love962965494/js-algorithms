## 链表
在计算机科学中，一个链表是数据元素的线性集合，元素的线性顺序不是由它们在内存中的位置给出的，相反，每个元素指向下一个元素。它是由一组节点组成的数据结构，这些节点一起表示序列。

在最简单的形式下，每个节点由数据和序列中下一个节点的引用（换句话说，链接）组成。这种结构允许在迭代期间有效地从序列中的任何位置插入和删除元素。

更复杂的变体添加额外的链接，允许有效地插入或删除任意元素引用。链表的一个缺点是访问时间是线性的（而且难以管道化）。

更快的访问，如随机访问，是不可行的。与链表相比，数组具有更好的缓存位置。

<img src="https://camo.githubusercontent.com/37013b59008ed49a6701968da6b182eb6a9d24c8/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f362f36642f53696e676c792d6c696e6b65642d6c6973742e737667" style="background: #fff" alt="聊表示意图">

## 复杂度
### 时间复杂度

| Access | Search | Insertion | Deletion |
| ------ | ------ | --------- | -------- |
| O(n)   | O(n)   | O(1)      | O(1)     |

### 空间复杂度
O(n)

## 参考
* <a href="https://en.wikipedia.org/wiki/Linked_list">WikiPedia</a>
* <a href="https://www.youtube.com/watch?v=njTh_OwMljA&index=2&t=1s&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8">Youtube</a>