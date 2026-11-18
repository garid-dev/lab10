# Лаб 10 — Цомгийн өгөгдөл боловсруулах

## Хийсэн ажил

- `js/utils.js`: зургаан arrow function; `makeCounter` нь дуудлага бүрээр өмнөх утгыг буцаан нэгээр нэмэгдүүлнэ, `applyN` нь функцийг заасан удаа хэрэглэнэ.
- `js/photoTools.js`: массивыг өөрчлөхгүйгээр шүүх, хайх, эрэмбэлэх болон зураг/байршлын утга хувиргах үндсэн найман функц; нэмэлт `groupByPlace` функц.
- `js/objectTools.js`: spread, destructuring, rest ашигласан найман цэвэр объектын функц.
- `js/album.js`: `#photos` private талбар, deep-copy getter/`find`, нэмэх, устгах, like, JSON хөрвүүлэлт; `FeaturedAlbum` нь like 3 хүрсэн зургуудыг автоматаар харуулна.
- `js/app.js`: хайлт, байршлын шүүлтүүр, эрэмбэ, like товч болон Lab 9-ийн `validateName`-ийг ашигласан зураг нэмэх форм.
- Онцлох зургийн тэмдэглэгээг зураг дээр давхар байрлуулж, like товчны мөрийн байрлал like нэмэхэд шилжихгүй болгосон.
- Эхний 8 зурагт Lab 9-ийн галерейн бодит бүтээлийн зургийг холбоод эх сурвалжийн холбоосыг харуулна. Mona Lisa-ийн зураг локал; сүлжээний зураг ачаалагдахгүй үед харагдах fallback гарна.
- `lab10.test.mjs`: хоосон массив, давтан like, зайтай хайлт зэрэг шаардлагыг хамарсан 15 тест.

## Browser API дэмжлэг

2026-11-13-нд Can I Use-ийн [Object.groupBy](https://caniuse.com/mdn-javascript_builtins_object_groupby) хуудсыг шалгахад дэлхийн хэрэглээний дэмжлэг 94.46% байв. Chrome/Edge 117+, Firefox 119+, Safari 17.4+, Samsung Internet 24+ дэмждэг; түүнээс өмнөх зарим хувилбарт дэмжлэггүй эсвэл хэсэгчилсэн. Иймээс `groupByPlace` боломжтой үед `Object.groupBy` ашиглаж, байхгүй үед `reduce` fallback хэрэглэнэ.

[`structuredClone()`](https://developer.mozilla.org/docs/Web/API/Window/structuredClone) болон [`Array.prototype.toSorted()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)-ийг боломжтой үед ашиглаж, хуучин хөтөчид JSON clone болон `[...array].sort()` fallback-тай. [`Object.groupBy()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)-ийн хуучин хөтөчийн fallback нь `reduce` юм.

## Тест

`node --test lab10.test.mjs`

Автомат тестийн файлыг 15 шалгалттай болгосон. Энэ орчинд Node.js байхгүй тул `node --test`-ээр ажиллуулж баталгаажуулах боломжгүй байв. Browser дээрх 10 JS smoke шалгалт амжилттай; мөн зайтай хайлт 8 зургийг хэвээр харуулж, форм зураг нэмэхэд 9 болгож, like 3 хүрэхэд онцлох тэмдэг гарч ирэхэд товчны карт доторх байрлал хэвээр байгааг шалгасан.
