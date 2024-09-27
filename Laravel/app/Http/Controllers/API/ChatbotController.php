<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function respond(Request $request)
    {
        $userMessage = strtolower($request->input('message'));
        
        // Default response
        $responseMessage = "I'm sorry, I cannot assist with that yet. Could you please clarify your query?";

        // Example dynamic responses based on message content
        if (str_contains($userMessage, 'rent')) {
            $responseMessage = "To rent a vehicle, please visit our category page or let me know if you need help navigating.";
        } elseif (str_contains($userMessage, 'pricing')) {
            $responseMessage = "You can view the vehicle prices in our product listings. Is there a particular vehicle you are interested in?";
        } elseif (str_contains($userMessage, 'available')) {
            $responseMessage = "You can check the availability of vehicles by visiting the product page or using the search feature.";
        } elseif (str_contains($userMessage, 'popular') || str_contains($userMessage, 'demand')) {
            $responseMessage = "You can check the popular section in our home page as it has most demanded products of our website.";
        } elseif (str_contains($userMessage, 'payment')) {
            $responseMessage = "Right now we accept khalti pay and cash on delivery only. we are working on other payment methods.";
        } elseif (preg_match('/(hello|hi|hey)/', $userMessage)) {
            $responseMessage = "Hello! How can I assist you with your vehicle rental needs today?";
        }

        return response()->json([
            'status' => 200,
            'response' => $responseMessage,
        ]);
    }

}
