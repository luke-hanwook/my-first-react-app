export type HistoryData = {
  keyword: string;
  date: string;
};

let data: HistoryData[] = [
  { keyword: "검색기록2", date: "12.03" },
  { keyword: "검색기록1", date: "12.02" },
  { keyword: "검색기록0", date: "12.01" }
];

export default {
  list() {
    return Promise.resolve(data);
  },

  add(keyword: string) {
    keyword = keyword.trim();
    if (!keyword) return;
    if (data.some(item => item.keyword === keyword)) {
      this.remove(keyword);
    }

    const date = "12.31";
    data = [{ keyword, date }, ...data];
  },

  remove(keyword: string) {
    data = data.filter(item => item.keyword !== keyword);
  }
};
