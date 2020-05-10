## TypeScript + MongoDB + MVC

### Stack:

- dotenv
- ts-node
- nodemon
- typescript
- tsconfig-paths
- mongoDB atlas
- mongoose
- colors
- express

### 配置环境步骤

- yarn init -y
- yarn add express mongoose dotenv
- yarn add @types/express @types/mongoose ts-node typescript nodemon --dev
- 根目录新建.env，里面放配置信息（端口号，用户名，密码...）
- package.json 添加 script

```
"scripts": {
  "start": "nodemon dist/index.js",
  "build": "tsc"
},
```

- 根目录新建 nodemon.json

```
{
  "watch": ["./src/**/*", ".env"],
  "ext": ".ts,.js",
  "exec": "ts-node -r tsconfig-paths/register ./src/server.ts"
}
```

- tsc --init 初始化 ts 配置文件
- 修改 tsconfig.json 文件

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "allowJs": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": "./src",
    "strict": true,
    "strictPropertyInitialization": false,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "paths": {
      // alias别名,@用于引包写路径方便
      "@services/*": ["services/*"],
      "@config/*": ["config/*"]
    }
  },
  "exclude": ["node_modules"],
  "include": ["src"]
}
```

### TS 配置路径别名

tsconfig.json 中

```
"baseUrl": "./src",
"paths": {
  // alias别名,@用于引包写路径方便
  "@services/*": ["services/*"],
  "@config/*": ["config/*"]
}
```

### 安装 tsconfig-paths 包 解决 TS 配置路径问题

```
yarn add tsconfig-paths --dev
```

### 使用 MongoDB，定义 Schema 的时候要配置下泛型接口

> 两种写法都可以，要不要导出是看其他地方有没有用到这个接口定义

```
import { model, Document, Schema } from 'mongoose';

export type MessageModel = Document & {
  subject: String;
  body: String;
  completedAt: Date;
  tags: string[];
};

// 或者

interface MessageModel extends Document {
  subject: String;
  body: String;
  completedAt: Date;
  tags: string[];
}

const MessageSchema = new Schema(
  {
    subject: {
      type: String,
      trim: true,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    completedAt: {
      type: Date,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<MessageModel>('Message', MessageSchema);
```
