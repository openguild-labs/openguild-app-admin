# Database creation instruction in Supabase

## Table creation

Create tables below in **Table Editor** tab. Primary Key is ID by default.

### `user` table

| Name           |   Type    |         Default value | Note |
|:---------------|:---------:|----------------------:|------|
| email          |   text    | (Set as empty string) |      |
| wallet_address |   text    | (Set as empty string) |      |
| first_name      |   text    | (Set as empty string) |      |
| last_name      |   text    | (Set as empty string) |      |
| is_student     |   bool    |                 FALSE |      |
| username       |   text    | (Set as empty string) |      |
| github         |   text    | (Set as empty string) |      |
| facebook       |   text    | (Set as empty string) |      |
| twitter        |   text    | (Set as empty string) |      |
| discord        |   text    | (Set as empty string) |      |
| discord_id     |   text    | (Set as empty string) |      |
| created_at     | timestamp |                 now() |      |
| deleted_at     | timestamp |                  NULL |      |

### `mission_category` table

| Name        |   Type    |         Default value | Note |
|:------------|:---------:|----------------------:|------|
| name        |   text    | (Set as empty string) |      |
| description |   text    | (Set as empty string) |      |
| created_at  | timestamp |                 now() |      |
| deleted_at  | timestamp |                  NULL |      |

### `mission` table

| Name                     |   Type    |         Default value | Note                       |
|:-------------------------|:---------:|----------------------:|----------------------------|
| title                    |   text    | (Set as empty string) |                            |
| description              |   text    | (Set as empty string) |                            |
| start_date               |   text    | (Set as empty string) |                            |
| end_date                 |   text    | (Set as empty string) |                            |
| banner                   |   text    | (Set as empty string) |                            |
| is_featured              |   text    |               'false' | (use `text` type to sort)  |
| created_at               | timestamp |                 now() |                            |
| deleted_at               | timestamp |                  NULL |                            |
| mission_category_id (FK) |           |                       | -> `mission_category`.`id` |

### `task` table

| Name               |   Type    |         Default value | Note              |
|:-------------------|:---------:|----------------------:|-------------------|
| name               |   text    | (Set as empty string) |                   |
| description        |   text    | (Set as empty string) |                   |
| type               |   text    | (Set as empty string) |                   |
| action             |   text    | (Set as empty string) |                   |
| xp                 |   int8    |                     0 |                   |
| button_placeholder |   text    | (Set as empty string) |                   |
| created_at         | timestamp |                 now() |                   |
| deleted_at         | timestamp |                  NULL |                   |
| mission_id (FK)    |           |                       | -> `mission`.`id` |

### `completed_task` table

| Name         |   Type    | Default value | Note           |
|:-------------|:---------:|--------------:|----------------|
| completed_at | timestamp |         now() |                |
| created_at   | timestamp |         now() |                |
| deleted_at   | timestamp |          NULL |                |
| user_id (FK) |           |               | -> `user`.`id` |
| task_id (FK) |           |               | -> `task`.`id` |

### `proofs_of_work` table

| Name         |   Type    |         Default value | Note           |
|:-------------|:---------:|----------------------:|----------------|
| proof        |   text    | (Set as empty string) |                |
| image        |   text    | (Set as empty string) |                |
| is_verified  |   bool    |                 FALSE |                |
| created_at   | timestamp |                 now() |                |
| deleted_at   | timestamp |                  NULL |                |
| user_id (FK) |           |                       | -> `user`.`id` |
| task_id (FK) |           |                       | -> `task`.`id` |

### `reward` table

| Name         |   Type    |         Default value | Note |
|:-------------|:---------:|----------------------:|------|
| name         |   text    | (Set as empty string) |      |
| quantity     |   int8    |                     0 |      |
| requirements |   text    | (Set as empty string) |      |
| type         |   text    | (Set as empty string) |      |
| description  |   text    | (Set as empty string) |      |
| image        |   text    | (Set as empty string) |      |
| is_shared    |   bool    |                 FALSE |      |
| created_at   | timestamp |                 now() |      |
| deleted_at   | timestamp |                  NULL |      |

### `claim_request` table

| Name       |   Type    |         Default value | Note |
|:-----------|:---------:|----------------------:|------|
| object_id  |   int8    |                     0 |      |
| type       |   text    | (Set as empty string) |      |
| discord_id |   text    | (Set as empty string) |      |
| created_at | timestamp |                 now() |      |
| deleted_at | timestamp |                  NULL |      |

## View creation

Run SQL codes below in **SQL Editor** tab.

### `completed_mission_view` 

```sql
    CREATE VIEW completed_mission_view
    WITH(security_invoker = true)
    AS
    SELECT ct.user_id, t.mission_id, (
        SELECT COUNT(id) = COUNT(ct.task_id)
        FROM task t2
        WHERE t2.deleted_at IS NULL
        AND t2.mission_id = t.mission_id
    ) AS is_completed
    FROM task t
    INNER JOIN completed_task ct ON ct.task_id = t.id
    WHERE t.deleted_at IS NULL
    GROUP BY ct.user_id, t.mission_id
```

### `mission_sub_info_view`

```sql
    CREATE VIEW mission_sub_info_view
    WITH(security_invoker = true)
    AS
    SELECT 
        m.id AS mission_id, 
        mc.name AS category, 
        (
        SELECT SUM(t.xp)
        FROM task t
        WHERE t.deleted_at IS NULL
        AND t.mission_id = m.id
        ) AS total_xp
    FROM mission m
    JOIN mission_category mc ON mc.id = m.mission_category_id AND mc.deleted_at IS NULL
    WHERE m.deleted_at IS NULL
```

### `participant_quantity_view`

```sql
    CREATE VIEW participant_quantity_view
    WITH(security_invoker = true)
    AS
    SELECT t.mission_id, COUNT(DISTINCT ct.user_id) AS quantity
    FROM completed_task ct 
    JOIN task t ON t.id = ct.task_id AND t.deleted_at IS NULL
    WHERE ct.deleted_at IS NULL
    GROUP BY t.mission_id
```

## Storage creation

Create buckets `proofs_of_work`, `banners`, `reward_images` and set public for them in **Storage** tab.
To re-use image for Mission or Reward:
 - create a folder named `common` or anything else in:
    - bucket `banners`, if Mission
    - bucket `reward_images`, if Reward
 - upload image to that folder and get path of image
 - paste that path to:
    - column `banner` of table `mission`, if Mission
    - column `image` of table `reward`, if Reward

## Policy creation

There are 2 roles in this database:
 - `service_role`: for client
 - `authenticated`: for admin

In **Authentication/Policies** tab, with each table:
 - convention of policy name: `{table name}_{role name}_{policy command}`. Ex: `mission_authenticated_select`
 - grant all Policy Command for `authenticated` and grant only `SELECT` Policy Command for `service_role` for all tables
 - with `service_role`, grant additional `CREATE` Policy Command for tables `claim_request`, `completed_task`, `proofs_of_work`, `user` and `UPDATE` Policy Command for `user` table
 - input `true` in SQL expression requirement

In **Storage/Policies** tab, 
- buckets `banners` and `reward_images`:  grant all operations for `authenticated` and `SELECT` for `service_role`.
- bucket `proofs_of_work`: grant all operations for `authenticated` and `INSERT` for `service_role`.

## Admin account creation

To login Admin Dashboard, create an user in **Authentication/Users** tab