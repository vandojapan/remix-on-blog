const basePosts = [
  {
    id: "react-router-framework-mode",
    title: "Framework Mode でブログを組み立てる",
    summary:
      "React Router v7 の loader、resource route、エラーバウンダリを使ってページと API を同じアプリで扱います。",
    category: "React Router",
    publishedAt: "2026-05-10",
    readingTime: "4 min",
    image: {
      src: "/images/router-gallery.svg",
      alt: "ルート線とパネルを重ねた抽象的なギャラリー画像",
    },
    body: [
      "Framework Mode では、ルートごとの loader がページ表示に必要なデータを先に集めます。コンポーネントは取得済みの loaderData を受け取るため、画面側の責務が読みやすく保てます。",
      "このブログでは /api/posts を resource route として用意し、記事一覧と記事詳細の loader から fetch しています。外部サービスに依存しないので、開発環境でもビルド後でも同じ動きを確認できます。",
      "エラーは Response を throw して扱います。存在しない記事 ID の場合は 404 を返し、root の ErrorBoundary がユーザー向けの画面へ変換します。",
    ],
  },
  {
    id: "css-modules-layout",
    title: "CSS Modules で崩れにくいレイアウトを作る",
    summary:
      "ページ、カード、シェルを小さく分け、レスポンシブとダークモードをグローバル変数で支えます。",
    category: "Styling",
    publishedAt: "2026-05-12",
    readingTime: "3 min",
    image: {
      src: "/images/css-gallery.svg",
      alt: "CSS Modules の構造を表す抽象的なブロック画像",
    },
    body: [
      "CSS Modules はクラス名の衝突を避けつつ、コンポーネント単位で見た目を閉じ込められます。大きな CSS フレームワークを使わない構成でも、保守しやすい粒度を作れます。",
      "色は app.css のカスタムプロパティで定義し、各 module は var() を参照します。テーマ切り替えでは data-theme を変えるだけで、全体の配色が自然に更新されます。",
      "カードやヘッダーの余白は clamp() を使い、画面幅が変わっても極端に詰まらないようにしています。",
    ],
  },
  {
    id: "fetch-error-handling",
    title: "fetch とエラーハンドリングの境界線",
    summary:
      "fetch の成功判定を lib に集約し、ルート側ではデータの使い方だけに集中できるようにします。",
    category: "Data",
    publishedAt: "2026-05-15",
    readingTime: "5 min",
    image: {
      src: "/images/fetch-gallery.svg",
      alt: "データ取得の流れを表す抽象的なカード画像",
    },
    body: [
      "fetch は HTTP 404 や 500 でも Promise を reject しません。そのため response.ok を必ず確認し、失敗時は適切な Response を投げ直します。",
      "取得処理を app/lib/api.js にまとめると、一覧と詳細で同じエラー処理を共有できます。ルートコンポーネントは表示ロジックに集中でき、テスト対象も明確になります。",
      "ローディング表示は useNavigation でグローバルに出しています。ページ遷移中だけヘッダー下にインジケーターを表示し、ユーザーに処理中であることを伝えます。",
    ],
  },
  {
    id: "vite-minimal-stack",
    title: "Vite で最小限の依存に保つ",
    summary:
      "React Router の公式 Vite プラグインだけを使い、Tailwind や TypeScript なしで要件に合わせた構成にします。",
    category: "Vite",
    publishedAt: "2026-05-18",
    readingTime: "3 min",
    image: {
      src: "/images/vite-gallery.svg",
      alt: "Vite の軽量な構成を表す抽象的な画像",
    },
    body: [
      "今回の構成では Vite 設定に @react-router/dev/vite の reactRouter プラグインだけを登録しています。CSS Modules は Vite が標準で扱えるため、追加のライブラリは不要です。",
      "JavaScript 固定の要件に合わせ、設定ファイルも app 配下も .js と .jsx に統一しました。型生成や typecheck スクリプトも外し、ビルド手順をシンプルにしています。",
      "依存を減らすと、アップデート時の確認範囲も小さくなります。必要なものだけを入れる方が、この規模のブログにはちょうどよい選択です。",
    ],
  },
];

const gallerySeries = [
  ["route-loaders", "Loader で画面の準備を整える", "React Router", "/images/router-gallery.svg"],
  ["nested-layouts", "ネストしたレイアウトを読み解く", "React Router", "/images/router-gallery.svg"],
  ["module-naming", "CSS Modules の命名を軽くする", "Styling", "/images/css-gallery.svg"],
  ["dark-theme", "テーマ変数で夜の表示を整える", "Styling", "/images/css-gallery.svg"],
  ["api-boundaries", "API 境界を小さく保つ", "Data", "/images/fetch-gallery.svg"],
  ["loading-states", "ローディングを邪魔にしない", "Data", "/images/fetch-gallery.svg"],
  ["vite-assets", "Vite の静的アセットを使う", "Vite", "/images/vite-gallery.svg"],
  ["minimal-deps", "依存を増やす前に考える", "Vite", "/images/vite-gallery.svg"],
  ["error-boundary", "ErrorBoundary の見せ方", "React Router", "/images/router-gallery.svg"],
  ["gallery-ui", "ギャラリーUIの余白設計", "Styling", "/images/css-gallery.svg"],
  ["fetch-pages", "10件ずつ読み込む設計", "Data", "/images/fetch-gallery.svg"],
  ["build-check", "ビルドで崩れを早めに拾う", "Vite", "/images/vite-gallery.svg"],
  ["route-meta", "meta 関数でページを整える", "React Router", "/images/router-gallery.svg"],
  ["card-rhythm", "カードの高さにリズムを作る", "Styling", "/images/css-gallery.svg"],
  ["response-json", "Response.json を素直に使う", "Data", "/images/fetch-gallery.svg"],
  ["server-render", "SSR とクライアント遷移を揃える", "React Router", "/images/router-gallery.svg"],
];

const generatedPosts = gallerySeries.map(([slug, title, category, imageSrc], index) => ({
  id: slug,
  title,
  summary:
    "ギャラリー型ブログで読みやすさと動きの気持ちよさを両立するための短い実装ノートです。",
  category,
  publishedAt: `2026-06-${String(index + 1).padStart(2, "0")}`,
  readingTime: `${3 + (index % 3)} min`,
  image: {
    src: imageSrc,
    alt: `${title} を表す抽象的なギャラリー画像`,
  },
  body: [
    "一覧では画像の比率をそろえると、視線の移動が安定します。16:9 のサムネイルは横長のギャラリーにも記事カードにも扱いやすい比率です。",
    "データ取得は offset と limit を使った単純なページングにしています。UI 側は現在の件数を offset として渡すだけなので、追加読み込みの流れが読みやすくなります。",
    "小さな実装でも、表示件数、ロード中、終端、エラーの状態を分けておくと、あとから API を差し替えるときも落ち着いて変更できます。",
  ],
}));

export const posts = [...basePosts, ...generatedPosts];
