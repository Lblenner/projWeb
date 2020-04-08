webpackHotUpdate("static/development/pages/add.js",{

/***/ "./components/Header.tsx":
/*!*******************************!*\
  !*** ./components/Header.tsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_go__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/go */ "./node_modules/react-icons/go/index.esm.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_icons_gi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/gi */ "./node_modules/react-icons/gi/index.esm.js");
var _this = undefined,
    _jsxFileName = "/home/louis/projets/projWeb/front/components/Header.tsx";



var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




var titre = {
  fontSize: 35
};

var Header = function Header() {
  return __jsx("nav", {
    className: "jsx-2882383161" + " " + "navbar navbar-expand-md navbar-dark bg-primary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 3
    }
  }, __jsx("button", {
    type: "button",
    "data-toggle": "collapse",
    "data-target": "#collapsibleNavbar",
    className: "jsx-2882383161" + " " + "navbar-toggler",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 5
    }
  }, __jsx(react_icons_gi__WEBPACK_IMPORTED_MODULE_5__["GiHamburgerMenu"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }
  }), " Les recettes de Martine"), __jsx("div", {
    id: "collapsibleNavbar",
    className: "jsx-2882383161" + " " + "collapse navbar-collapse",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 5
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }
  }, __jsx("a", {
    style: titre,
    className: "jsx-2882383161" + " " + "navbar-brand",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 9
    }
  }, "Les recettes de Martine")), __jsx("ul", {
    id: "center",
    className: "jsx-2882383161" + " " + "navbar-nav",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }, __jsx("li", {
    className: "jsx-2882383161" + " " + "nav-item active",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 9
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/add",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 11
    }
  }, __jsx("button", {
    className: "jsx-2882383161" + " " + "btn btn-success",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 13
    }
  }, __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaRegPlusSquare"], {
    size: 30,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 49
    }
  }), " Ajouter une recette "))), __jsx("li", {
    className: "jsx-2882383161" + " " + "nav-item",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 11
    }
  }, __jsx("a", {
    id: "recherche",
    className: "jsx-2882383161" + " " + "nav-link active",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 13
    }
  }, __jsx(react_icons_go__WEBPACK_IMPORTED_MODULE_3__["GoSearch"], {
    size: 20,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 59
    }
  }), " Rechercher")))), __jsx("ul", {
    className: "jsx-2882383161" + " " + "navbar-nav ml-auto",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }
  }, __jsx("li", {
    className: "jsx-2882383161" + " " + "nav-item",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 9
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/profile",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 11
    }
  }, __jsx("a", {
    className: "jsx-2882383161" + " " + "nav-link active",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 13
    }
  }, "Profil"))))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "2882383161",
    __self: _this
  }, "#center.jsx-2882383161{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.jsx-2882383161,#recherche.jsx-2882383161{fontSize:40;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2xvdWlzL3Byb2pldHMvcHJvaldlYi9mcm9udC9jb21wb25lbnRzL0hlYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkNnQixBQUdvQixBQU1oQixZQUFDLDhEQUxjLHVFQUNXLG1HQUN6QiIsImZpbGUiOiIvaG9tZS9sb3Vpcy9wcm9qZXRzL3Byb2pXZWIvZnJvbnQvY29tcG9uZW50cy9IZWFkZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IEdvU2VhcmNoIH0gZnJvbSAncmVhY3QtaWNvbnMvZ28nO1xuaW1wb3J0IHsgRmFSZWdQbHVzU3F1YXJlIH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnXG5pbXBvcnQge0dpSGFtYnVyZ2VyTWVudX0gZnJvbSAncmVhY3QtaWNvbnMvZ2knXG5cbmNvbnN0IHRpdHJlID0ge1xuICBmb250U2l6ZTogMzVcbn07XG5cbmNvbnN0IEhlYWRlciA9ICgpID0+IChcbiAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWV4cGFuZC1tZCBuYXZiYXItZGFyayBiZy1wcmltYXJ5XCI+XG5cbiAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGVyXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNjb2xsYXBzaWJsZU5hdmJhclwiPlxuICAgICAgPCBHaUhhbWJ1cmdlck1lbnUvPiBMZXMgcmVjZXR0ZXMgZGUgTWFydGluZVxuICAgIDwvYnV0dG9uPlxuXG5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVwiIGlkPVwiY29sbGFwc2libGVOYXZiYXJcIj5cblxuICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgc3R5bGU9e3RpdHJlfT5MZXMgcmVjZXR0ZXMgZGUgTWFydGluZTwvYT5cbiAgICAgIDwvTGluaz5cblxuICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdmJhci1uYXZcIiBpZD1cImNlbnRlclwiPlxuICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW0gYWN0aXZlXCI+XG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9hZGRcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzXCI+PEZhUmVnUGx1c1NxdWFyZSBzaXplPXszMH0gLz4gQWpvdXRlciB1bmUgcmVjZXR0ZSA8L2J1dHRvbj5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXYtbGluayBhY3RpdmVcIiBpZD1cInJlY2hlcmNoZVwiPjxHb1NlYXJjaCBzaXplPXsyMH0gLz4gUmVjaGVyY2hlcjwvYT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuXG4gICAgICA8dWwgY2xhc3NOYW1lPVwibmF2YmFyLW5hdiBtbC1hdXRvXCI+XG4gICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvcHJvZmlsZVwiPlxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2LWxpbmsgYWN0aXZlXCI+UHJvZmlsPC9hPlxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG5cbiAgICA8c3R5bGUganN4PntgXG4gICAgI2NlbnRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1ncm93OiAxO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfSxcbiAgICAjcmVjaGVyY2hlIHtcbiAgICAgIGZvbnRTaXplOiA0MFxuICAgIH1cbiAgICBgfTwvc3R5bGU+XG4gIDwvbmF2PlxuXG5cblxuKTtcblxuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7Il19 */\n/*@ sourceURL=/home/louis/projets/projWeb/front/components/Header.tsx */"));
};

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ })

})
//# sourceMappingURL=add.js.79708e1014621f6ccc4e.hot-update.js.map