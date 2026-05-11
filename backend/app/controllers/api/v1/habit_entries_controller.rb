module Api
  module V1
    class HabitEntriesController < BaseController
      def index
        entries = current_user.habit_entries
        render json: entries
      end

      def create
        entry = current_user.habit_entries.find_or_initialize_by(
          date: params[:date],
          habit_name: params[:habit_name]
        )

        entry.done = params[:done]

        if entry.save
          render json: entry
        else
          render json: { errors: entry.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end
  end
end