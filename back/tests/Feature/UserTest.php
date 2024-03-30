<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */


    public function test_can_get_users()
    {
        $response = $this->get('/api/users');
        $response->assertStatus(200);
    }
}
