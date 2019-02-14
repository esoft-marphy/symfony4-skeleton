### DEVELOPMENT

We are using:

```json
php: 7.2
node: 9.10.0
npm: 5.6.0
postgres: 9.6.10
```

# first steps
```bash
composer install
npm install

# install databases
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
```

After composer install you need write .env fila for your environment settings
Example not prepared beacous default values is wrote in services.yaml

# second setps
```bash
npm run start
php bin/console server:run 0.0.0.0:8000
```

## Login Required

for `/admin` we need be logged
default user with role `ROLE_SUPER_ADMIN` has 
```yaml
email: admin
password: forgot
```

Let`s go
