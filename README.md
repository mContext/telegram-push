# Telegram 消息推送机器人

## 开发
0. 安装 nodejs npm
1. clone 项目
2. `npm install`
3. 创建 KV 和生成 wrangler.toml：
`python3 deploy.py`

## 部署

1. 点这个

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/sduoduo233/telegram-push)

2. 登陆 Github

![Deploy to Cloudflare Workers](https://files.yourblog.eu.org/0a846e77-96c0-4056-a496-e8aacc28dc7f.png)

3. 登陆 Cloudflare

![Configure Cloudflare Account](https://files.yourblog.eu.org/972211c5-158a-4d89-b61d-4d1f9d3a758c.png)

打开[这个链接](https://dash.cloudflare.com/?to=/:account/workers)，然后找到 Account ID 填进去：
![Account ID](https://files.yourblog.eu.org/bda0eabc-7f4c-4717-879b-43c447cf1e1a.png)

然后打开[这个连接](https://dash.cloudflare.com/profile/api-tokens)，新建一个 API Token，模板选 `Edit Cloudflare Workers`：

![Create API Token](https://files.yourblog.eu.org/2f0398f4-1b14-44b9-acdd-a0f90f2f29c0.png)

设置一下 Account 和 Zone，然后点创建： 
![Create API Token](https://files.yourblog.eu.org/a1fc440c-6202-4ffd-b244-d6bf5c3c9d64.png)

然后把 API Token 填进去：
![https://files.yourblog.eu.org/bf69b9e3-7a6b-42d1-9891-74ce0f127b12.png](https://files.yourblog.eu.org/bf69b9e3-7a6b-42d1-9891-74ce0f127b12.png)

4. Deploy with GitHub Actions

这一步按照提示来就行
![https://files.yourblog.eu.org/0fbb37a8-8818-4f53-a56b-51585b5b6044.png](https://files.yourblog.eu.org/0fbb37a8-8818-4f53-a56b-51585b5b6044.png)

5. 这时候你刚刚 Fork 的仓库会有一个正在运行的 Action，如果没有的话可以手动运行一下

![https://files.yourblog.eu.org/8baaf541-4a65-4c88-8563-d6d7bc3b5ff2.png](https://files.yourblog.eu.org/8baaf541-4a65-4c88-8563-d6d7bc3b5ff2.png)

6. 等这个 Action 运行完就可以在 Cloudflare 面板看到刚刚部署的 Worker

![https://files.yourblog.eu.org/8bffbece-4935-4225-875d-4e2ec0c3448f.png](https://files.yourblog.eu.org/8bffbece-4935-4225-875d-4e2ec0c3448f.png)

7. 找 [Bot Father](https://t.me/BotFather) 创建一个机器人

![https://files.yourblog.eu.org/3bfcdf2d-6bd7-44c6-a001-3f614ad50c74.png](https://files.yourblog.eu.org/3bfcdf2d-6bd7-44c6-a001-3f614ad50c74.png)

8. 打开你的 Cloudflare Worker，然后会看到一个安装页面：

![https://files.yourblog.eu.org/8991eeef-583e-4767-9638-3aea195b9c1e.png](https://files.yourblog.eu.org/8991eeef-583e-4767-9638-3aea195b9c1e.png)

把你 Bot 的 Token 输进去，然后点安装

9. 然后就可以推送消息了

![https://files.yourblog.eu.org/aa0f3df3-8571-47f9-b382-24ab67f2d445.png](https://files.yourblog.eu.org/aa0f3df3-8571-47f9-b382-24ab67f2d445.png)

```bash
curl "https://YOUR_WORKER_DOMAIN/push?key=YOUR_KEY&msg=YOUR_MESSAGE"
```