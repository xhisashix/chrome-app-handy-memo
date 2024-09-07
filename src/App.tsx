import "./App.css";
import "./index.css";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet
        title="Handy Memo - develop by React"
        meta={[
          {
            name: "description",
            content: "Markdown形式でメモを取ることができるアプリです。",
          },
        ]}
      ></Helmet>
      <div className="main container-md p-3">
        <h3 className="text-3xl">Handy Memo</h3>
        <div className="form-group">
          <div className="form-group d-flex">
            <ul className="nav nav-tabs" id="nav"></ul>
          </div>
          <div className="form-group">
            <div id="title_area">
              <input
                type="text"
                name="title"
                id="title"
                className="form-control appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="タイトル"
              />
            </div>
          </div>
          <div id="memo_area">
            <textarea
              className="form-control appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="memo"
              rows={10}
            ></textarea>
          </div>
          <div className="flex flex-col mt-2">
            <div className="form-group">
              <div
                className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md"
                role="alert"
              >
                <ul>
                  <li className="form-text text-muted">
                    メモとタイトルは自動で保存されます。
                  </li>
                  <li className="form-text text-muted mt-0">
                    リセットはタイトルとテキストボックスのどちらも初期化されます。
                  </li>
                  <li className="form-text text-muted mt-0">
                    タイトルが未入力の場合、現在の日付と時間でダウンロードできます。
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
