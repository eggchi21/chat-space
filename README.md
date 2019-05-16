## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name||string|null: false |
|email|string|null: false, unique: true|
|password||string|null: false,|

### Association
- has_many :members
- has_many :messages
- has_many :groups, through: :members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name||string|null: false|
|user_id|integer|
|message_id|integer|

### Association
- has_many :members
- has_many :messages
- has_many :users, through: :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body||text|null: false|
|image||string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

