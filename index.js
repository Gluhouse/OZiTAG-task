const app = () => {
  const allOptions = [...document.querySelectorAll("option")];
  const mainOptions = findMainOptions(allOptions);

  hideTree(mainOptions, allOptions);

  const trees = [];

  mainOptions.forEach((el) => {
    trees.push(makeTree(el));
  });

  mainOptions.forEach((el) => {
    el.addEventListener("click", () => {
      trees[mainOptions.indexOf(el)].forEach((element) => {
        if (+element.dataset.level === 1 && element.hidden === true) {
          element.hidden = false;
        } else element.hidden = true;
      });
    });
  });

  addListenerOnTrees(trees);
};

const findMainOptions = (allOptions) => {
  const mainOptions = [];

  allOptions.forEach((el) => {
    if (el.innerHTML.toString().includes("[A]")) {
      mainOptions.push(el);
    }
  });

  mainOptions.forEach((el, index) => {
    if (index === 0) {
      el.classList.add("active");
      return;
    }
    el.classList.add("not-active");
  });

  return mainOptions;
};

hideTree = (mainOptions, allOptions) => {
  for (let i = 0; i < allOptions.length; i++) {
    for (let k = 0; k < mainOptions.length; k++) {
      if (allOptions[i] === mainOptions[k]) {
        allOptions.splice(i, 1);
      }
    }
  }

  allOptions.forEach((el) => {
    el.hidden = true;
  });
};

const makeTree = (mainOption) => {
  const tree = [];

  currentTree = true;

  for (let i = +mainOption.value + 1; currentTree; i++) {
    let option = document.querySelector(`option[value="${i}"]`);

    if (option === null || option.innerHTML.toString().includes("[A]")) {
      currentTree = false;
      break;
    }

    tree.push(option);
  }

  return tree;
};

const addListenerOnTrees = (trees) => {
  trees.forEach((tree) => {
    for (let i = 0; i < tree.length; i++) {
      if (i + 1 < tree.length) {
        if (tree[i].dataset.level < tree[i + 1].dataset.level) {
          let subTree = [];
          let closeTree = [];

          if (typeof tree[i + 1] !== "undefined") {
            filterLevel = tree[i + 1].dataset.level;
            subTree = tree.filter(
              (branch) => +branch.dataset.level === +filterLevel
            );

            let copy = [...tree];

            let maxLevel = copy.sort(
              (a, b) => b.dataset.level - a.dataset.level
            )[0].dataset.level;

            if (typeof tree[i + 2] !== "undefined") {
              for (let k = tree[i + 1].dataset.level; k <= maxLevel; k++) {
                closeTree.push(
                  ...tree.filter((branch) => +branch.dataset.level === +k)
                );
              }
            }
          }

          closeTree.forEach((el) => {
            tree[i].addEventListener("click", () => {
              if (el.opened === 1) {
                el.hidden = true;
                el.opened = -1;
                return;
              }
              el.opened = 0;
            });
          });

          subTree.forEach((el) => {
            tree[i].addEventListener("click", () => {
              if (el.opened === 0 || typeof el.opened === "undefined") {
                el.hidden = false;
                el.opened = 1;
                return;
              }
              el.opened = 0;
            });
          });
        }
      }
    }
  });
};

app();
