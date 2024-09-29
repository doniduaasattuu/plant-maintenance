<?php

namespace App\Providers;

use App\Models\Document;
use App\Policies\DocumentPolicy;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Relation::enforceMorphMap([
            'motor_check' => 'App\Models\MotorCheck',
            'ac_check' => 'App\Models\AcCheck',
        ]);

        Gate::policy(Document::class, DocumentPolicy::class);
    }
}
