# Database design

### users

| column | type | option |
|:-:|:-:|:-:|
| name | string | unique: true, add_index |
| email | string | unique: true |
| password | string | null: false |

- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

### groups

| colomn | type | option |
|:-:|:-:|:-:|
| name | string | unique: true, add_index |

- has_many :group_users
- has_many :users, through: :group_users
- has_many :messages

### groups_users

| colomn | type | option |
|:-:|:-:|:-:|
| user_id | references | foreign_key: true  |
| group_id | references | foreign_key: true  |

- belongs_to :user
- belongs_to :group

### messages

| colomn | type | option |
|:-:|:-:|:-:|
| body | text | add_index |
| image | string | |
| group_id | references | foreign_key: true |
| user_id | references | foreign_key: true |

- belongs_to :user
- belongs_to :group
