<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\WorkCenterResource;
use App\Models\Department;
use App\Models\WorkCenter;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        Gate::authorize('profile_edit');

        $departments = Department::all();
        $work_centers = WorkCenter::all();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'departments' => DepartmentResource::collection($departments),
            'work_centers' => WorkCenterResource::collection($work_centers),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        Gate::authorize('profile_update');

        $user = auth()->user();
        $validated = $request->safe()->except(['profile_photo']);

        if ($request->hasFile('profile_photo')) {
            if ($user->profile_photo) {
                // DELETE CURRENT PHOTO PROFILE
                Storage::disk('public')->delete($user->profile_photo);
            }

            // STORE PHOTO TO PUBLIC FOLDER
            $fileName = $user->id . '_' . time() . "." . strtolower($request->file('profile_photo')->extension());
            $path = $request->file('profile_photo')->storeAs('assets/photos/users', $fileName, 'public');
            $validated['profile_photo'] = $path;
        }

        $request->user()->fill($validated);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Gate::authorize('profile_delete');

        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
