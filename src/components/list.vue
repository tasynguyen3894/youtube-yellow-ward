<template>
    <div>
        <h4>LIST</h4>
        <ul>
            <li v-for="user in users">
                <a v-bind:href="user.link">{{ user.title }}</a>
            </li>
        </ul>
    </div>    
</template>
<script>
import * as youtubeSearch from "youtube-search";

export  default {
    name: "List",
    data: () => {
        return {
            users: [
            ]
        }
    },
    created: function() {
        var opts = {
            maxResults: 10,
            key: "AIzaSyCRmbQBCQYb5xYJFS-TBD5hY640AD1ij5A"
        };
        let _this = this;
        youtubeSearch("jsconf", opts, (err, results) => {
            if(err) return console.log(err);
        
            _this.users = results
        });
    }
}
</script>
<style scoped>

</style>
