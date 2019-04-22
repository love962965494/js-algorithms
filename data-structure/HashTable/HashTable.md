## 哈希表
在计算机科学中，一个哈希表(hash table或hash map)是一种实现关联数组(associative array)的抽象数据，一种映射keys和values的数据结构。

哈希表使用哈希函数/散列函数来计算一个值在数组或桶(buckets)或槽(slot)中对应的索引，可使用该索引找到所需的值。

理想情况下，散列函数将为每个键分配一个唯一的桶(bucket)，但是大多数哈希表设计采用不完美的散列函数，这可能会导致“哈希冲突(hash collisions)”，也就是散列函数为多个键(key)生成了相同的索引，这种碰撞必须以某种方式进行处理。

<img src="https://camo.githubusercontent.com/2b2b396c714c8344d3928c46d6b0f6be47d3d8c8/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37642f486173685f7461626c655f335f315f315f305f315f305f305f53502e737667" style="background: #fff;" alt="哈希表示意图"/>

通过单独的链接解决哈希冲突

<img src="https://camo.githubusercontent.com/404b54bac0302f96ef42dcd4c9bc4fc5ea03ec0b/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f642f64302f486173685f7461626c655f355f305f315f315f315f315f315f4c4c2e737667" style="background: #fff" alt="解决哈希冲突" />

## 参考
* <a href="https://en.wikipedia.org/wiki/Hash_table">Wikipedia</a>
* <a href="https://www.youtube.com/watch?v=shs0KM3wKv8&index=4&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8">YouTube</a>