<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CUser;
use App\Models\CClients;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $user = new CUser();$user->user_name = 'ABRAHAN ISBOSET CRUZ LOPEZ';$user->password = bcrypt('Shades23811');$user->is_active = 1; $user->save();	
        // $client = new CClients();$client->client_id = 23811;$client->short_name = 'ABRAHAN ISBOSET CRUZ LOPEZ';$client->full_name = 'ABRAHAN ISBOSET CRUZ LOPEZ';$client->agent_id = 4;$client->email='ventasdf@shadesdemexico.com; ventas@persianaseclipsol.com; auxiliardecompraseclipsol@gmail.com';$client->category_c_id= 1;$client->is_partner = 0;$client->user_id = $user->id;$client->save();
        

    }
}
