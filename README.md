mac版です<br>
$はターミナルに入力する内容です。
(1) gitcloneします。<br>
$ git clone git@github.com:Kitahara43965/nextjs-auth-app.git<br>
(2) nextjs-auth-appディレクトリに移動<br>
$ cd nextjs-auth-app<br>
(3) nextをインストールします<br>
$ npm install next react react-dom<br>
(4) プロジェクト直下に.envファイルを作成します。.envファイルに下記を記載します。<br>
DATABASE_URL="mysql://root:password@localhost:3306/auth_app"<br>
NEXTAUTH_SECRET=<br>
NEXTAUTH_URL=http://localhost:3000<br>
ここで、NEXTAUTH_SECRETの値は<br>
$ openssl rand -base64 32<br>
と入力して取得します。<br>
NEXTAUTH_SECRET=“(取得した値)”<br>
とします。<br>
(5) データ初期化<br>
$npx prisma migrate reset
で初期化します。<br>
(6) サーバー立ち上げ <br>
$ npm run devでサーバーを立ち上げます。<br>
