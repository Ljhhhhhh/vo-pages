import Mock from 'mockjs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// https://juejin.im/post/5d391188e51d4577407b1e2e
export interface ArticleParams {
  id: number;
  timestamp: number;
  author: string;
  reviewer: string;
  title: string;
  content_short: string;
  content: string;
  forecast: string;
  type: number;
  status: string;
  display_time: number;
  comment_disabled: boolean;
  pageviews: number;
  image_uri: string;
  platforms: string;
}

const List: ArticleParams[] = [];
const count = 50;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment',
      author: '@cname',
      title: '@ctitle(5, 10)',
      image_uri: '@image(200x100, #4A7BF7, Image)',
    })
  );
}

interface listParams {
  query: {
    page: number
    type?: number
    title?: string
    limit?: number
    sort?: string
  }
}

export default {
  start() {
    let mock = new MockAdapter(axios);
    mock
      .onGet('/article/list')
      .reply(
        (config: any) => {
          const { type, title, page = 1, limit = 10, sort } = config.params;

          let mockList = List.filter(item => {
            if (type && item.type !== type) return false;
            if (title && item.title.indexOf(title) < 0) return false;
            return true;
          });

          if (sort === '-id') {
            mockList = mockList.reverse();
          }

          const pageList = mockList.filter(
            (item, index) => index < limit * page && index >= limit * (page - 1)
          );
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, {
                  total: mockList.length,
                  items: pageList
              }])
            }, 1000)
          })
        }
      );
  }
};
