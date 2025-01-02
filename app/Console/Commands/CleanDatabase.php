<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CleanDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean the database by executing DatabaseCleaner';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("Cleaning the Database...");

        $cleaner = new \Database\Seeders\DatabaseCleaner();
        $cleaner->run();

        $this->info("Database cleaned successfully!");
    }
}
