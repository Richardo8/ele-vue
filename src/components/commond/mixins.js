  import {getStyle} from '@/config/mutils';

  export const getPicUrl = {
    methods: {
      getPicUrl:function (url) {
        const imgBaseUrl = 'https://fuss10.elemecdn.com';
        let suffix;
        if(!url){
          return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'
        }
        if (url.indexOf('jpeg') !== -1) {
          suffix = '.jpeg'
        } else {
          suffix = '.png'
        }
        let new_url = '/' + url.substr(0, 1) + '/' + url.substr(1, 2) + '/' + url.substr(3) + suffix;
        return imgBaseUrl + new_url;
      }
    }
  }

  export const loadMore = {
      directives: {
          'load-more': {
              bind: (el, binding) => {
                  console.log(el)
                  let windowHeight = window.screen.height;
                  let heightEl = el;
                  let scrollEl = document.body;
                  let height;
                  let setTop;
                  let paddingBottom;
                  let marginBottom;
                  let oldScrollTop;
                  let requestFrame;
                  let scrollReduce = 2;

                  el.addEventListener('touchstart', () => {
                      height = heightEl.clientHeight;
                      setTop = el.offsetTop;
                      paddingBottom = getStyle(el, 'paddingBottom');
                      marginBottom = getStyle(el, 'marginBottom');
                  }, false)

                el.addEventListener('touchmove', () => {
                    loadMore();
                }, false)

                el.addEventListener('touchend', () => {
                    oldScrollTop = scrollEl.scrollTop;
                    moveEnd();
                })

                const moveEnd = () => {
                    requestFrame = requestAnimationFrame(() => {
                      if(scrollEl.scrollTop != oldScrollTop){
                          oldScrollTop = scrollEl.scrollTop;
                          moveEnd();
                      }else{
                          cancelAnimationFrame(requestFrame);
                          height = heightEl.clientHeight;
                          loadMore();
                      }
                    })
                }

                const loadMore = () => {
                      if(scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce){
                        binding.value();
                      }
                }
              }
          }
      }
  }

