<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Agnitio Generator</title>
		<style>body{font-family: "arial"; font-size: 15px;}</style>
	</head>

	<body>
		<form id="first-form" action="<?php $_SERVER['PHP_SELF']; ?>" method="post">
			<label for="presentation-name">Presentation Name:</label><br>
			<input type="text" name="presentation-name" id="presentation-name"><br>
			<label for="number-of-slides">Number of Slides:</label><br>
			<input type="text" name="number-of-slides" id="number-of-slides" style="width: 21px; text-align: right;"><br>
			<button style="height: 25px; background-color: #99CCFF; font-weight: bold; cursor: pointer; margin-left: 45px">Add Slides</button>
		</form>
		<br>
		<form id="second-form" action="post.php" method="post">
			<?php if ($_POST) : ?>
				<?php $number_of_slides = $_POST['number-of-slides']; ?>
				<h1 style="margin-bottom: 20px;"><?php echo $_POST['presentation-name']; ?></h1>
				<input type="hidden" name="presentation-name" value="<?php echo $_POST['presentation-name']; ?>">

				<?php for ( $i = 1; $i <= $number_of_slides; $i++) : ?>
					<?php echo $i.'&nbsp;&nbsp;'; ?>
					<input type="text" name="slides[]" style="width: 200px"><br>
				<?php endfor; ?>
			<?php endif; ?>
			<br>
			<button style="margin-left: 20px; height: 25px; background-color: #99FF99; font-weight: bold; cursor: pointer;">Generate Slides</button>			
		</form>
	</body>
</html>