<?php $sha1= 'Generate SHA1'; if(!empty($_POST['input'])) $sha1=sha1($_POST['input']); ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <h3><?php echo $sha1; ?></h3>
        <form class="" action="sha.php" method="post">
            <input type="text" name="input" value="<?php echo $_POST['input'];?>"><br>
            <input type="submit" name="submit" value="Generate">
        </form>
    </body>
</html>
