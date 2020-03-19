export type KeywordData = {
  keyword: string;
};

const data: KeywordData[] = [
  { keyword: "이탈리아" },
  { keyword: "세프의요리" },
  { keyword: "제철" },
  { keyword: "홈파티" }
];

export default {
  list(): Promise<KeywordData[]> {
    return new Promise(res => {
      setTimeout(() => {
        res(data);
      }, 200);
    });
  }
};
