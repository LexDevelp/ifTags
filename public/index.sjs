<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <header></header>
    <main>

      <if condition={'usuario'=='usuario'}>
        <h1>condicional valida 1</h1>
      </if>
      
      <if condition={1 == 444}> <h1>Titulo condicional 2</h1> </if>

      <if condition={1 > 444}> <h1>Titulo condicional 3</h1> <else><h3>No condicional 3</h3></else></if>
      
      <if condition={44 === 444}>
        <h1>Titulo condicional 4</h1>
          <else><h3>No condicional 4</h3></else>
      </if>

      <if condition={(4 + 4)==89}> es 8 <else>no es 8</else> </if>

      <for i=0 i<5 i++ >
          <p>bucle</p>
      </for>



    </main>
    <footer></footer>
  </body>
</html>
