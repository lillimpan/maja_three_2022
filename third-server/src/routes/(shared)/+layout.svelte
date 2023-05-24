

<script lang="ts">
    import type { LayoutServerData } from "./$types";
    export let data: LayoutServerData;
</script>

<body>
  <div class="top-strip">
    <div class="dropdown">
        <button class="drop"><img src="menu.png" alt="menu" width="30" height="30"></button>
        <div class="dropdown-content">
            <a href="./settings"><button class = "style_button1">Settings</button></a>
            <a href="./info"><button class = "style_button2">Info</button></a>
            <a href="./support"><button class = "style_button3">Support</button></a>
            <a href="/"><button class = "style_button4">Home</button></a>
        </div>
    </div>
  </div>
</body>
<nav>
    

    <!-- <a href="/">Home</a>

    <a href="/settings">Settings</a>

    <a href="/info">Info</a>

    <a href="/support">Support</a> -->
</nav>
<p>Username: {data?.username}</p>

<style>

:global(body){
        background-color: rgb(52, 73, 94);
        text-align: center;
    }

.style_button1{
    margin-right: 53%;
    border: none;
    margin-top: 8%;
    background-color: rgb(133, 146, 158);
}
.style_button2{
    margin-right: 200%;
    border: none;
    background-color: rgb(133, 146, 158);
    
}
.style_button3{
    margin-right: 200%;
    border: none;
    background-color: rgb(133, 146, 158);
}
.style_button4{
    margin-right: 200%;
    border: none;
    background-color: rgb(133, 146, 158);
}

.top-strip{
  background-color: rgb(133, 146, 158);
  width: 100%;
  height: 40px;
}
/* p{
  background-color: rgb(133, 146, 158);
  width:30%;
  margin-left:35%;
  border-radius: 40px;
} */

.drop {
  background-color:rgba(0, 0, 0, 0.0);
  color: white;
  padding-top: 5px;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
  margin-right: 95.4%;
  
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgb(133, 146, 158);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: rgb(133, 146, 158);}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .drop {background-color: rgba(0, 0, 0, 0.0);}


</style>

<slot />
