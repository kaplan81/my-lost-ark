<?php
/**
*** TEMPLATES
**/

//HTML template
$html = "templates/slides/html.html"; 
//CSS template
$css = "templates/code/css/css.css"; 
//JS template
$js = "templates/code/js/js.js";

//Slide details from submitted form 
$slides = $_POST['slides'];
$presentation = strtolower($_POST['presentation-name']);

if($slides){
    
    $output_dir = 'OUTPUT/';
    $content_dir = 'OUTPUT/content/';
    $img_dir = 'OUTPUT/content/img/';
    $slides_dir = 'OUTPUT/slides/';
    $code_dir = 'OUTPUT/code/';
    $css_dir = 'OUTPUT/code/css/';
    $js_dir = 'OUTPUT/code/js/';
    
    if(!file_exists($output_dir))mkdir($output_dir);
    if(!file_exists($content_dir))mkdir($content_dir);
    if(!file_exists($img_dir))mkdir($img_dir);
    if(!file_exists($slides_dir))mkdir($slides_dir);
    if(!file_exists($code_dir))mkdir($code_dir);
    if(!file_exists($css_dir))mkdir($css_dir);
    if(!file_exists($js_dir))mkdir($js_dir);
	
	if(file_exists($slides_dir) && file_exists($code_dir) && file_exists($css_dir) && file_exists($js_dir)){
        
        echo '<h1 style="font-family: arial; color:green;">Voila!</h1>';

        $json_slide_array = array();

        foreach($slides as $key => $slide){

            $slide = strtolower($slide);

            //Iterate on the slides array for the JSON file
            $json_slide_array[$slide] = array( "name" => str_replace('_', ' ', ucfirst("$slide")) , "file" => "$slide.html" );
		
            //Load strings
            $html_str = file_get_contents($html);
            $css_str = file_get_contents($css);
            $js_str = file_get_contents($js);
            
            //Make slide image dir
            $slide_dir = 'OUTPUT/content/img/' . $slide;
            if(!file_exists($slide_dir))mkdir($slide_dir);

            //Replace strings
            $html_str = str_replace('&&&', $slide, $html_str);
            $css_str = str_replace('&&&', $slide, $css_str);
            $js_str = str_replace('&&&', $slide, $js_str);

            //Create file 
            $html_output = $slides_dir . $slide . ".html"; 
            $css_output = $css_dir . $slide . ".css"; 
            $js_output = $js_dir . $slide . ".js"; 

            //Open file
            $html_file = fopen($html_output, 'w') or die("can't open HTML"); 
            $css_file = fopen($css_output, 'w') or die("can't open CSS"); 
            $js_file = fopen($js_output, 'w') or die("can't open JS"); 

            //Write html to file 
            fwrite($html_file, $html_str) or die("can't write HTML");
            fwrite($css_file, $css_str) or die("can't write CSS"); 
            fwrite($js_file, $js_str) or die("can't write JS"); 

            //Close file
            fclose($html_file);
            fclose($css_file);
            fclose($js_file);
        }
        
        //JSON: from array to presentation.json
        $json_presentation_array = array("slides" => 
                                            $json_slide_array,
                                        "structures" =>
                                            array(
                                                "$presentation" => 
                                                        array("name" => strtoupper("$presentation"), "type" => "collection", "content" => []),
                                                "slideshow" =>
                                                        array("name" => strtoupper("slideshow"), "type" => "slideshow", "content" => ["slideshow1"]),
                                            ),
                                        "storyboard" => ["$presentation"]);
        
        $json_presentation_string =  preg_replace('/\s*([\]])/', '$1', preg_replace('/([\[])\s*/', '$1', json_encode($json_presentation_array, JSON_PRETTY_PRINT)));

        echo '<pre>';
            echo $json_presentation_string;
        echo '</pre>';

        if (!file_exists('OUTPUT/presentation.json')) {
            $json_presentation_file = fopen('OUTPUT/presentation.json', 'w') or die("can't open JSON");
            fwrite($json_presentation_file, $json_presentation_string) or die("can't write JSON");
            fclose($json_presentation_file);
        }
    }
    	
} else {
	echo '<h1 style="font-family: arial;">You dumb...</h1>';
    echo '<br>';
    echo '<a href="index.php" style="font-family: arial;">GO BACK</a>';
}