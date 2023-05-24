<script lang="ts">
    import { enhance } from "$app/forms";

    export let form: any;
</script>

<link
    href="https://fonts.googleapis.com/css?family=Albert Sans"
    rel="stylesheet"
    type="text/css"
/>
<body>
    <div class="login_container">
        <div>
            <h3>Logga in</h3>
        </div>

        <form use:enhance method="POST" action="?/login">
            <input
                class="username"
                type="text"
                placeholder="Användarnamn"
                name="username"
                required
            />

            <input
                class="password"
                type="password"
                placeholder="Lösenord"
                name="password"
                id="password"
                required
            />

            {#if form?.message}
                <p class="error">{form?.message}</p>
            {/if}

            <button class="login" type="submit">Logga in</button>
        </form>

        <div class="change_method">
            <h6>
                Har du inte ett konto <a href="/register">Registrera</a>
                Dig
            </h6>
        </div>
    </div>
</body>

<style>
    .error {
        /* background-color: rgb(101, 101, 101);
		width: 30%;
		border-radius: 40px;
		height: 50px;
		font-size: 200%; */
        font-family: Albert Sans;
        color: white;
        /* margin-left: 35%;
		padding-top: 1%; */
        margin-top: -5%;
        margin-bottom: 3%;
    }
    :global(body) {
        background-color: rgb(52, 73, 94);
        text-align: center;
    }

    /* h1{
        color: white;
        font-family: "Albert Sans";
    } */

    h3 {
        color: white;
        font-size: 170%;
        font-family: "Albert Sans";
    }

    h6 {
        color: white;
        font-family: "Albert Sans";
        text-align: start;
        padding-left: 32px;
        margin-top: 3px;
        margin-bottom: 6px;
    }

    a {
        color: lightblue;
    }

    .username {
        background-color: white;
        height: 40px;
        width: 300px;
        border: none;
        border-radius: 10px;
        outline: none;
        width: 80%;
    }

    .password {
        background-color: white;
        height: 40px;
        width: 80%;
        border: none;
        border-radius: 10px;
        outline: none;
    }

    .login {
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

    .login:hover {
        box-shadow: 0px 0px 12px rgb(45, 45, 45);
    }

    input {
        font-size: 120%;
        font-family: "Albert Sans";
        margin-bottom: 7%;
    }

    .login_container {
        text-align: center;
        background-color: rgb(133, 146, 158);
        margin-left: 40%;
        width: 20%;
        padding-top: 1%;
        padding-bottom: 30px;
        border-radius: 40px;
        box-shadow: 0px 0px 25px rgb(45, 45, 45);
        align-items: center;
        margin-top: 10%;
    }

    div.change_method {
        margin-left: 17.5%;
        margin-top: 4%;
    }

    @media (max-width: 1200px) {
        div.change_method {
            margin-left: 7%;
        }
    }

    @media (max-width: 1200px) {
        .login_container {
            width: 30%;
            margin-left: 35%;
        }
    }

    @media (max-width: 1200px) {
        .login_container {
            width: 30%;
            margin-left: 35%;
        }
    }

    @media (max-width: 800px) {
        .login_container {
            width: 50%;
            margin-left: 25%;
        }
    }

    @media (max-width: 600px) {
        .login_container {
            width: 50%;
            margin-left: 25%;
        }
    }

    @media (max-width: 450px) {
        .login_container {
            width: 70%;
            margin-left: 15%;
        }
    }

    @media (max-width: 450px) {
        .login_container {
            width: 70%;
            margin-left: 15%;
        }
    }

    @media (max-width: 300px) {
        .login_container {
            width: 80%;
            margin-left: 10%;
        }
    }
</style>
