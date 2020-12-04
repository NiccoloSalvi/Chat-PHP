<?php
    session_start();
    session_destroy();
?>
<script>
    window.location = "login.php"; // redirect to login page
    deleteCookies();

    function deleteCookies() { 
        var allCookies = document.cookie.split(';'); 

        for (var i = 0; i < allCookies.length; i++) 
            document.cookie = allCookies[i] + "=;expires=" 
            + new Date(0).toUTCString(); 

        displayCookies.innerHTML = document.cookie; 
    }

</script>