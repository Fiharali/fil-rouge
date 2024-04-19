<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class isStaff
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()) {
            // Get the authenticated user
            $user = $request->user();

            // Check if the user has the required role
            if ($user->roles()->where('name', 'staff')->exists()) {
                return $next($request);
            }
        }

        // If user's role doesn't match, return an error response
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
