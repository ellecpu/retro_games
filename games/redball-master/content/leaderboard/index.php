<!doctype html>
<html lang="en-US">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="../shared-res/style/meyers-reset.css">
		<link rel="stylesheet" href="../shared-res/style/default.css">
		<link rel="stylesheet" href="leaderboard.css">
		<title>Redball. Leaderboard</title>
	</head>
	<body>
		<section id="board">
			<div class="grid-container">
				<div class="grid-item">
					<p>#</p>
				</div>
				<div class="grid-item">
					<p>Name</p>
				</div>
				<div class="grid-item">
					<p>Score</p>
				</div>
				<div class="grid-item">
					<p>Date</p>
				</div>
				<?php
					require '../shared-res/server-script/db-connect.php';
					$sql = "SELECT * FROM `Leaderboard` ORDER BY `Score` DESC";
					$result = $connection->query($sql);
					if($result->num_rows > 0){
						$i = 1;
						while($row = $result->fetch_assoc()) {
							$firstPlace = $i === 1;
							echo 
									"<div class=\"grid-item" . ($firstPlace ? " first-place" : "") . "\">" . 
										"<p>" . $i . "</p>" . 
									"</div>" . 
									"<div class=\"grid-item" . ($firstPlace ? " first-place" : "") . "\">" . 
										"<p>" . $row["Name"] . "</p>" . 
									"</div>" . 
									"<div class=\"grid-item" . ($firstPlace ? " first-place" : "") . "\">" . 
										"<p>" . $row["Score"] . "</p>" . 
									"</div>" . 
									"<div class=\"grid-item" . ($firstPlace ? " first-place" : "") . "\">" . 
										"<p>" . $row["Date"] . "</p>" . 
									"</div>";
							$i++;
						}
					}
					else {
						echo "<p>0 results</p>";
					}
					$connection->close();
				?>
			</div>
		</section>
		<a class="button" id="back-button" href="../">Back to Menu</a>
	</body>
</html>
