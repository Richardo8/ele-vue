<script>
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

</script>
