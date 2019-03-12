<?php 
            if(isset($_POST["submit"]))
            {
                $to = "cxc9597@rit.edu";
                
                $from = empty(trim($_POST["email"])) ? "noemail@example.com" : sanitize_string($_POST["email"]);
                
                $subject = "Web Form";
                
                $message = empty(trim($_POST["message"])) ? "No message" : sanitize_string($_POST["message"]);
                
                $name = empty(trim($_POST["name"])) ? "No name" : sanitize_string($_POST["name"]);
                
                $human = empty(trim($_POST["human"])) ? "0" : sanitize_string($_POST["human"]);
                
                $reason = empty(trim($_POST["reason"])) ? "No reason" : sanitize_string($_POST["reason"]);
                
                $headers = "From: $from" . "\r\n";
                
                $message .= "\n\n - $name because of $reason";
                
                if(intval($human) == 4)
                {
                    $sent = mail($to, $subject, $message, $headers);
                    
                    if($sent)
                    {
                        echo "<p><b>You sent:</b> $message</p>";
                    }
                    else
                    {
                        echo "<p>Mail could not be sent</p>";
                    }
                }
                else
                {
                    echo "<p>Nice try bot. You can't fool me!</p>";
                }
            }
        
            function sanitize_string($string)
            {
                $string = trim($string);
                
                $string = strip_tags($string);
                
                return $string;
            }
        ?>
