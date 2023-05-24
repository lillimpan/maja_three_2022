<link href="https://fonts.googleapis.com/css?family=Albert Sans" rel="stylesheet" type="text/css">
<script>
let showbox = false;

function box() {
	showbox = true;
}
function hidebox() {
	showbox = false;
}

</script>

<div class="settings-container" style="display: {showbox ? "none" : ""}">
	<div class="buttons">
        <form method="POST" action="?/logout">
            <button class="logout">Logout</button>
        </form>

        <button on:click={() => {
            box();
        }} class="delete">
        
        Delete Account
        </button>
    </div>
</div>

<div class="box" style="display: {showbox ? "" : "none"}"> 

	<p> 
	 Are you sure you want to <br>delete your account?
	<p/>
 	<form method="POST" action="?/deleteaccount">
		<button class="confirm">YES</button>
	</form>
		<button  class="cancel" on:click={() => {
		hidebox();
	}}>NO</button>
</div>


<style>

	.delete {
        background-color: rgb(133, 146, 158);
        height: 40px;
        width: 80%;
        border: none;
        border-radius: 10px;
        font-size: 120%;
        font-family: "Albert Sans";
        color: rgb(255, 255, 255);
        box-shadow: 0px 0px 7px rgb(45, 45, 45);
        font-weight: bold;
		margin-top: 20px;
    }

	.delete:hover{
        box-shadow: 0px 0px 12px rgb(45, 45, 45);
    }


	.cancel {
        background-color: rgb(133, 146, 158);
        height: 40px;
        width: 80%;
        border: none;
        border-radius: 10px;
        font-size: 120%;
        font-family: "Albert Sans";
        color: rgb(255, 255, 255);
        box-shadow: 0px 0px 7px rgb(45, 45, 45);
        font-weight: bold;
		margin-top: 20px;
    }

	.cancel:hover{
        box-shadow: 0px 0px 12px rgb(45, 45, 45);
    }

	.confirm {
        background-color: rgb(133, 146, 158);
        height: 40px;
        width: 80%;
        border: none;
        border-radius: 10px;
        font-size: 120%;
        font-family: "Albert Sans";
        color: rgb(255, 255, 255);
        box-shadow: 0px 0px 7px rgb(45, 45, 45);
        font-weight: bold;
		margin-top: 20px;
    }

	.confirm:hover{
        box-shadow: 0px 0px 12px rgb(45, 45, 45);
    }

	.logout {
        background-color: rgb(133, 146, 158);
        height: 40px;
        width: 80%;
        border: none;
        border-radius: 10px;
        font-size: 120%;
        font-family: "Albert Sans";
        color: rgb(255, 255, 255);
        box-shadow: 0px 0px 7px rgb(45, 45, 45);
        font-weight: bold;
    }

	.logout:hover{
        box-shadow: 0px 0px 12px rgb(45, 45, 45);
    }

    .buttons {
        padding-top: 35px;
    }

	.settings-container {
        text-align: center;
        background-color: rgb(133, 146, 158);
        margin-left: 35%;
        width: 30%;
        /* padding-top: 1%; */
        padding-bottom: 30px;
        border-radius: 40px;
        box-shadow: 0px 0px 25px rgb(45, 45, 45);
        align-items: center;
        margin-top: 10%;
    }
	.box {
		text-align: center;
        background-color: rgb(133, 146, 158);
        margin-left: 35%;
        width: 30%;
        padding-top: 1%;
        padding-bottom: 30px;
        border-radius: 40px;
        box-shadow: 0px 0px 25px rgb(45, 45, 45);
        align-items: center;
        margin-top: 10%;
		padding-top: 2%;
	}

	p {
		font-family: "Albert Sans";
		color: white;
		margin-top: 0px;
	}
	
</style>


