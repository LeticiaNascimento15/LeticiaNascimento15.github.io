<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<table>
<thead>
    <tr>
<th>Nome</th>
<th>CPF</th>
<th>RG</th>
<th>CEP</th>
<th>logradouro</th>
<th>Numero</th>
   </tr>
</thead>
<body>
 <?php
 $filtro= $_POST["filtro"];
 $arquivo = fopen("empregado.txt", "r");
    $linha= "";
    while(!feof($arquivo))
$linha = fgets($arquivo);
$dadosEmpregado = explode(SEPARADOR, $linha);
 $nome=$dadosEmpregado[1];
  $cpf=$dadosEmpregado[2];
  if(str_contains($nome, $filtro)){
    echo"<tr><td>".$nome."</td><td>".$cpf."</td><td></tr>";
  }
 ?>   

</body>
</table>
 </body>
 </html>