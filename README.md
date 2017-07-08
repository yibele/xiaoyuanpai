

### 接口说明


|   说明                                             |            路由格式             |控制器   |说明
|------------------------------------------------------------------------------------------------------------|
|   添加用户                                         |`POST:/v1/user`   |   `UserController@create`
|   通过用户名查找用户，<br> 返回用户的信息和用户参加的活动信息  |`GET : /v1/user/find/{nickName}`|`UserController@findByName`|
|   创建活动                                         |`POST: /v2/activity`| `ActivityController@create` |
|   获取首页活动                                      | `GET: /v1/activity/index` | `ActivityController@getIndexAct` |
|	获取互动分类信息								|   `GET: /v1/activity/cate`    | `ActivityController@getCate ` |
|	通过分类id获取分类所有活动		|	`GET: /v1/activity/cateDetail/{id}` | `ActivityController@getCateDetail` | 传入分类id
|	获取活动详情	|	`GET : /v1/activity/{id}/user/{uid}`| `ActivityController@show ` |说明：后面的uid传入自己的uid，返回一个tag，如果tag=1，说明用户已经参加了这个活动，如果tag为0，说明用户还未参加活动.
|用户添加活动| `POST : /v1/activity/userAddAct/` |  `ActivityController@userAddAct`| 需要活动id 用户id
|用户删除活动| `POST :/v1/activity/userDelAct/` | `ActivityController@userDelAct` | 需要的数据有活动 id  用户id


### 成功代码:
*   10001   创建用户成功
*   10002   创建活动成功
*   10003   用户参加活动成功
*   10004   获取首页活动信息成功
*   10005	获取分类信息成功
*   10006	获取分类详情成功
*   10007	获取活动详情成功并且用户参加了活动
*   10008	用户添加活动成功

### 错误代码:

#### 数据库错误代码:
*   40001   用户名不存在
*   40002   创建活动失败
*   40003   创建用户失败
*   40004   用户添加活动失败
*   40005	用户最多参加两个活动

#### 服务器错误代码：
*   50001   路由错误



---

## 踩的坑
### 路由
*   phalcon的路由格式必须是一`/`开头，结尾没有'/'。 例如 `/v1/uesr/` 这种路由就是错误的！

### POST
*   发送`POST` 请求的时候不要忘记添加`header : { 'content-type' : 'application/x-www-form-urlencoded'}`; 不然`POST` 请求发送空字符串,并且`header`的格式是一个对象。

### Flex 布局
*	微信中的 `flex` 布局不支持 `flex-wrap` 。所以要做的时候需要用到 `-webkit-flex-wrap: wrap` 来做！

### 布局
*	添加文字自动换行 ： `white-space: normal`